import cdk = require('@aws-cdk/core');
import { TweetQueue } from '../lib';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'tweet-queue-test');

const secretArn = process.env.TWEET_QUEUE_SECRET_ARN;
if (!secretArn) {
  throw new Error('To run this test, set up TWEET_QUEUE_SECRET_ARN in your environment');
}

new TweetQueue(stack, 'queue', {
  secretArn, 
  query: 'aws'
});

app.synth();