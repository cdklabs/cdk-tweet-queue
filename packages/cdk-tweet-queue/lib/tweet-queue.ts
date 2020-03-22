import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import sqs = require('@aws-cdk/aws-sqs');
import lambda = require('@aws-cdk/aws-lambda');
import targets = require('@aws-cdk/aws-events-targets');
import dynamodb = require('@aws-cdk/aws-dynamodb');
import events = require('@aws-cdk/aws-events');
import path = require('path');
import { Duration } from '@aws-cdk/core';

export interface TweetQueueProps {
  /**
   * The SecretsManager secret that contains Twitter authentication credentials
   * from https://apps.twitter.com/ with the following attributes (exact names):
   *  - consumer_key
   *  - consumer_secret
   *  - access_token_key
   *  - access_token_secret
   */
  readonly secretArn: string;

  /**
   * The twitter query string to stream.
   */
  readonly query: string;

  /**
   * Extra twitter search parameters.
   * See: https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
   */
  readonly queryParams?: {
    [x: string]: string | number | boolean
  };

  /**
   * Polling interval in minutes.
   * Set to 0 to disable polling.
   * @default 1min
   */
  readonly intervalMin?: number;

  /**
   * Number of seconds for messages to wait in the queue for processing.
   * After this time, messages will be removed from the queue.
   * @default 60 seconds
   */
  readonly retentionPeriodSec?: number;

  /**
   * Number of seconds for messages to be invisible while they are processed.
   * Based on the amount of time it would require to process a single message.
   * @default 60 seconds
   */
  readonly visibilityTimeoutSec?: number;
}

export class TweetQueue extends sqs.Queue {
  constructor(parent: cdk.Construct, id: string, props: TweetQueueProps) {
    super(parent, id, {
      retentionPeriod: props.retentionPeriodSec === undefined ? Duration.seconds(60) : Duration.seconds(props.retentionPeriodSec),
      visibilityTimeout: props.visibilityTimeoutSec === undefined ? Duration.seconds(60) : Duration.seconds(props.visibilityTimeoutSec)
    });

    const keyName = 'id';
    const table = new dynamodb.Table(this, 'CheckpointTable', {
      partitionKey: { name: keyName, type: dynamodb.AttributeType.STRING }
    });

    const fn = new lambda.Function(this, 'Poller', {
      code: lambda.Code.fromAsset(path.join(__dirname, '..', 'lambda')),
      handler: 'lib/index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: Duration.minutes(15),
      environment: {
        CREDENTIALS_SECRET: props.secretArn,
        TWITTER_QUERY: props.query,
        TWITTER_QUERY_PARAMS: props.queryParams && JSON.stringify(props.queryParams),
        QUEUE_URL: this.queueUrl,
        CHECKPOINT_TABLE_NAME: table.tableName,
        CHECKPOINT_TABLE_KEY_NAME: keyName
      }
    });

    fn.addToRolePolicy(new iam.PolicyStatement({
      resources: [ props.secretArn ],
      actions: [ 'secretsmanager:GetSecretValue' ]
    }));

    fn.addToRolePolicy(new iam.PolicyStatement({
      resources: [ this.queueArn ],
      actions: [ 'sqs:SendMessage', 'sqs:SendMessageBatch' ]
    }));

    table.grantReadWriteData(fn);

    const interval = props.intervalMin === undefined ? 1 : props.intervalMin;
    if (interval > 0) {
      const timer = new events.Rule(this, 'PollingTimer', {
        schedule: events.Schedule.rate(Duration.minutes(interval))
      });

      timer.addTarget(new targets.LambdaFunction(fn));
    }
  }
}

