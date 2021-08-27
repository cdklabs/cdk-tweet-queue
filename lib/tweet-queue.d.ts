import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
/**
 * @stability stable
 */
export interface TweetQueueProps {
    /**
     * The SecretsManager secret that contains Twitter authentication credentials from https://apps.twitter.com/ with the following attributes (exact names):   - consumer_key   - consumer_secret   - access_token_key   - access_token_secret.
     *
     * @stability stable
     */
    readonly secretArn: string;
    /**
     * The twitter query string to stream.
     *
     * @stability stable
     */
    readonly query: string;
    /**
     * Polling interval in minutes.
     *
     * Set to 0 to disable polling.
     *
     * @default 1min
     * @stability stable
     */
    readonly intervalMin?: number;
    /**
     * Number of seconds for messages to wait in the queue for processing.
     *
     * After this time, messages will be removed from the queue.
     *
     * @default 60 seconds
     * @stability stable
     */
    readonly retentionPeriodSec?: number;
    /**
     * Number of seconds for messages to be invisible while they are processed.
     *
     * Based on the amount of time it would require to process a single message.
     *
     * @default 60 seconds
     * @stability stable
     */
    readonly visibilityTimeoutSec?: number;
}
/**
 * @stability stable
 */
export declare class TweetQueue extends sqs.Queue {
    /**
     * @stability stable
     */
    constructor(parent: cdk.Construct, id: string, props: TweetQueueProps);
}
