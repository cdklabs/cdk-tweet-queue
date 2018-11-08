import cdk = require('@aws-cdk/cdk');
import iam = require('@aws-cdk/aws-iam');
import sqs = require('@aws-cdk/aws-sqs');
import lambda = require('@aws-cdk/aws-lambda');
import dynamodb = require('@aws-cdk/aws-dynamodb');
import events = require('@aws-cdk/aws-events');
import path = require('path');

export interface TweetQueueProps {
  /**
   * The SecretsManager secret that contains Twitter authentication credentials
   * from https://apps.twitter.com/ with the following attributes (exact names):
   *  - consumer_key
   *  - consumer_secret
   *  - access_token_key
   *  - access_token_secret
   */
  secretArn: string;

  /**
   * The twitter query string to stream.
   */
  query: string;

  /**
   * Polling interval in minutes.
   * Set to 0 to disable polling.
   * @default 1min
   */
  intervalMin?: number;

  /**
   * Number of seconds for messages to wait in the queue for processing.
   * After this time, messages will be removed from the queue.
   * @default 60 seconds
   */
  retentionPeriodSec?: number;

  /**
   * Number of seconds for messages to be invisible while they are processed.
   * Based on the amount of time it would require to process a single message.
   * @default 60 seconds
   */
  visibilityTimeoutSec?: number;
}

export class TweetQueue extends sqs.Queue {
  constructor(parent: cdk.Construct, id: string, props: TweetQueueProps) {
    super(parent, id, {
      retentionPeriodSec: props.retentionPeriodSec === undefined ? 60 : props.retentionPeriodSec,
      visibilityTimeoutSec: props.visibilityTimeoutSec === undefined ? 60 : props.visibilityTimeoutSec
    });

    const table = new dynamodb.Table(this, 'CheckpointTable');
    const keyName = 'id';
    table.addPartitionKey({ name: keyName, type: dynamodb.AttributeType.String });

    const fn = new lambda.Function(this, 'Poller', {
      code: lambda.Code.asset(path.join(__dirname, '..', 'lambda', 'bundle.zip')),
      handler: 'lib/index.handler',
      runtime: lambda.Runtime.NodeJS810,
      timeout: 15 * 60,
      environment: {
        CREDENTIALS_SECRET: props.secretArn,
        TWITTER_QUERY: props.query,
        QUEUE_URL: this.queueUrl,
        CHECKPOINT_TABLE_NAME: table.tableName,
        CHECKPOINT_TABLE_KEY_NAME: keyName
      }
    });

    fn.addToRolePolicy(new iam.PolicyStatement()
      .addResource(props.secretArn)
      .addAction('secretsmanager:GetSecretValue'));

    fn.addToRolePolicy(new iam.PolicyStatement()
      .addResource(this.queueArn)
      .addAction('sqs:SendMessage')
      .addAction('sqs:SendMessageBatch'));

    table.grantReadWriteData(fn.role);

    const interval = props.intervalMin === undefined ? 1 : props.intervalMin;
    if (interval > 0) {
      const unit = interval === 1 ? 'minute' : 'minutes';
      const timer = new events.EventRule(this, 'PollingTimer', {
        scheduleExpression: `rate(${interval} ${unit})`
      });

      timer.addTarget(fn);
    }
  }
}

