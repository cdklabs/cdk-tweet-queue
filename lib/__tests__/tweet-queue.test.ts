import '@aws-cdk/assert/jest';
import { App, Stack } from '@aws-cdk/core';
import { TweetQueue } from '..';

test('snapshot', () => {
  const app = new App();
  const stack = new Stack(app, 'test');

  new TweetQueue(stack, 'MyQueue', {
    secretArn: 'secret-arn',
    query: 'twitter query',
  });

  const template = app.synth().getStack(stack.artifactId).template;
  expect(template).toMatchSnapshot();
});