const Twitter = require('twitter');
import { SecretsManager, SQS, DynamoDB } from 'aws-sdk';
import { CheckpointTable } from './checkpoint';
import { getEnv } from './util';

const BATCH_SIZE = 100;
const MAX_RESULTS = 500;

exports.handler = async function(event: any, _context: any) {
  console.log('event:', JSON.stringify(event));

  const sqs = new SQS();
  const secretsManager = new SecretsManager();
  const checkpoint = new CheckpointTable();

  // get secret from secrets manager and create twitter client
  const secretId = getEnv('CREDENTIALS_SECRET');
  const result = await secretsManager.getSecretValue({ SecretId: secretId }).promise();
  const creds = JSON.parse(result.SecretString!);
  const twitter = new Twitter(creds);


  const query = getEnv('TWITTER_QUERY');

  // read last checkpoint (can be undefined)
  const cursor_tail = await checkpoint.getLastCheckpoint();
  console.log('cursor_tail (last checkpoint):', cursor_tail);

  let next_cursor_tail = 0;
  let cursor_head = undefined;
  const results: { [id: string]: boolean } = { };

  while (true) {
    const req = { q: query, count: BATCH_SIZE, max_id: cursor_head, since_id: cursor_tail };
    console.error('twitter search:', JSON.stringify(req));
    const res: any = await twitter.get('search/tweets', req);

    let min_id = res.search_metadata.max_id;
    let new_tweets = 0;
    for (const status of res.statuses) {
      if (status.id in results) {
        continue; // duplicate (possible)
      }

      results[status.id] = true;
      new_tweets++;

      // send tweet to queue
      await sqs.sendMessage({
        QueueUrl: process.env.QUEUE_URL!,
        MessageBody: JSON.stringify(status),
      }).promise();

      // track min_id to query next page
      if (status.id < min_id) {
        min_id = status.id;
      }

      // keep track of next cursor tail (the maximum id we processed)
      if (status.id > next_cursor_tail) {
        next_cursor_tail = status.id;
      }
    }

    console.log(`published ${new_tweets} new tweets`);

    // if we haven't received any new tweets, we are done here
    if (new_tweets === 0) {
      break;
    }

    if (Object.keys(results).length > MAX_RESULTS) {
      break;
    }

    // bring in the next page
    cursor_head = min_id;
  }

  if (cursor_tail !== next_cursor_tail) {
    console.log('storing max_id checkpoint:', next_cursor_tail);
    await checkpoint.checkpoint(next_cursor_tail);
  } else {
    console.log('no new checkpoint');
  }

  console.log('results:', Object.keys(results).length);
  return { count: results.length };
};
