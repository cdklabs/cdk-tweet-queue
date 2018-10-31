import { expect } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/cdk');
import { TweetQueue } from '../lib';
import fs = require('fs');
import path = require('path');

const stack = new cdk.Stack();

new TweetQueue(stack, 'MyQueue', {
  secretArn: 'secret-arn',
  query: 'twitter query'
});

const expected = JSON.parse(fs.readFileSync(path.join(__dirname, 'expected.json')).toString());
expect(stack).toMatch(expected);

console.log('PASS');