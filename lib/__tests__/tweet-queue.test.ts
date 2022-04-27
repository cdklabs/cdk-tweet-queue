import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { TweetQueue } from '..';

test('snapshot', () => {
  const app = new App();
  const stack = new Stack(app, 'test');

  new TweetQueue(stack, 'MyQueue', {
    secretArn: 'secret-arn',
    query: 'twitter query',
  });

  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});