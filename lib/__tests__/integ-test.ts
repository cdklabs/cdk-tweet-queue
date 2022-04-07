import { App, Stack } from 'aws-cdk-lib';
import { TweetQueue } from '..';

const app = new App();

const stack = new Stack(app, 'tweet-queue-test');

const secretArn = process.env.TWEET_QUEUE_SECRET_ARN;
if (!secretArn) {
  throw new Error('To run this test, set up TWEET_QUEUE_SECRET_ARN in your environment');
}

new TweetQueue(stack, 'queue', {
  secretArn,
  query: 'aws',
});

app.synth();