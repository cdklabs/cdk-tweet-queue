"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const aws_sdk_1 = require("aws-sdk");
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Twitter = require("twitter");
const checkpoint_1 = require("./checkpoint");
const util_1 = require("./util");
const BATCH_SIZE = 100;
const MAX_RESULTS = 500;
exports.handler = async function (event, _context) {
    console.log('event:', JSON.stringify(event));
    const sqs = new aws_sdk_1.SQS();
    const secretsManager = new aws_sdk_1.SecretsManager();
    const checkpoint = new checkpoint_1.CheckpointTable();
    // get secret from secrets manager and create twitter client
    const secretId = util_1.getEnv('CREDENTIALS_SECRET');
    const result = await secretsManager.getSecretValue({ SecretId: secretId }).promise();
    const creds = JSON.parse(result.SecretString);
    const twitter = new Twitter(creds);
    const query = util_1.getEnv('TWITTER_QUERY');
    // read last checkpoint (can be undefined)
    const cursor_tail = await checkpoint.getLastCheckpoint();
    console.log('cursor_tail (last checkpoint):', cursor_tail);
    let next_cursor_tail = 0;
    let cursor_head = undefined;
    const results = {};
    while (true) {
        const req = { q: query, count: BATCH_SIZE, max_id: cursor_head, since_id: cursor_tail };
        console.log('twitter search:', JSON.stringify(req));
        const res = await twitter.get('search/tweets', req);
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
                QueueUrl: process.env.QUEUE_URL,
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
    }
    else {
        console.log('no new checkpoint');
    }
    console.log('results:', Object.keys(results).length);
    return { count: results.length };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZEQUE2RDtBQUM3RCxxQ0FBOEM7QUFDOUMsNkRBQTZEO0FBQzdELGlFQUFpRTtBQUNqRSxtQ0FBbUM7QUFDbkMsNkNBQStDO0FBQy9DLGlDQUFnQztBQUVoQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUM7QUFDdkIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBRXhCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxXQUFVLEtBQVUsRUFBRSxRQUFhO0lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUU3QyxNQUFNLEdBQUcsR0FBRyxJQUFJLGFBQUcsRUFBRSxDQUFDO0lBQ3RCLE1BQU0sY0FBYyxHQUFHLElBQUksd0JBQWMsRUFBRSxDQUFDO0lBQzVDLE1BQU0sVUFBVSxHQUFHLElBQUksNEJBQWUsRUFBRSxDQUFDO0lBRXpDLDREQUE0RDtJQUM1RCxNQUFNLFFBQVEsR0FBRyxhQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM5QyxNQUFNLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyRixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFhLENBQUMsQ0FBQztJQUMvQyxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUduQyxNQUFNLEtBQUssR0FBRyxhQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFdEMsMENBQTBDO0lBQzFDLE1BQU0sV0FBVyxHQUFHLE1BQU0sVUFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUUzRCxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztJQUN6QixJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUM7SUFDNUIsTUFBTSxPQUFPLEdBQThCLEVBQUcsQ0FBQztJQUUvQyxPQUFPLElBQUksRUFBRTtRQUNYLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO1FBQ3hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sR0FBRyxHQUFRLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFekQsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDeEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLEtBQUssTUFBTSxNQUFNLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUNqQyxJQUFJLE1BQU0sQ0FBQyxFQUFFLElBQUksT0FBTyxFQUFFO2dCQUN4QixTQUFTLENBQUMsdUJBQXVCO2FBQ2xDO1lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDMUIsVUFBVSxFQUFFLENBQUM7WUFFYixzQkFBc0I7WUFDdEIsTUFBTSxHQUFHLENBQUMsV0FBVyxDQUFDO2dCQUNwQixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFVO2dCQUNoQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7YUFDcEMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWIsa0NBQWtDO1lBQ2xDLElBQUksTUFBTSxDQUFDLEVBQUUsR0FBRyxNQUFNLEVBQUU7Z0JBQ3RCLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO2FBQ3BCO1lBRUQsK0RBQStEO1lBQy9ELElBQUksTUFBTSxDQUFDLEVBQUUsR0FBRyxnQkFBZ0IsRUFBRTtnQkFDaEMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUM5QjtTQUNGO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLFVBQVUsYUFBYSxDQUFDLENBQUM7UUFFbEQsMERBQTBEO1FBQzFELElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTtZQUNwQixNQUFNO1NBQ1A7UUFFRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLFdBQVcsRUFBRTtZQUM3QyxNQUFNO1NBQ1A7UUFFRCx5QkFBeUI7UUFDekIsV0FBVyxHQUFHLE1BQU0sQ0FBQztLQUN0QjtJQUVELElBQUksV0FBVyxLQUFLLGdCQUFnQixFQUFFO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUM1RCxNQUFNLFVBQVUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUMvQztTQUFNO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQ2xDO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNuQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBTZWNyZXRzTWFuYWdlciwgU1FTIH0gZnJvbSAnYXdzLXNkayc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0c1xuaW1wb3J0IFR3aXR0ZXIgPSByZXF1aXJlKCd0d2l0dGVyJylcbmltcG9ydCB7IENoZWNrcG9pbnRUYWJsZSB9IGZyb20gJy4vY2hlY2twb2ludCc7XG5pbXBvcnQgeyBnZXRFbnYgfSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBCQVRDSF9TSVpFID0gMTAwO1xuY29uc3QgTUFYX1JFU1VMVFMgPSA1MDA7XG5cbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIGZ1bmN0aW9uKGV2ZW50OiBhbnksIF9jb250ZXh0OiBhbnkpIHtcbiAgY29uc29sZS5sb2coJ2V2ZW50OicsIEpTT04uc3RyaW5naWZ5KGV2ZW50KSk7XG5cbiAgY29uc3Qgc3FzID0gbmV3IFNRUygpO1xuICBjb25zdCBzZWNyZXRzTWFuYWdlciA9IG5ldyBTZWNyZXRzTWFuYWdlcigpO1xuICBjb25zdCBjaGVja3BvaW50ID0gbmV3IENoZWNrcG9pbnRUYWJsZSgpO1xuXG4gIC8vIGdldCBzZWNyZXQgZnJvbSBzZWNyZXRzIG1hbmFnZXIgYW5kIGNyZWF0ZSB0d2l0dGVyIGNsaWVudFxuICBjb25zdCBzZWNyZXRJZCA9IGdldEVudignQ1JFREVOVElBTFNfU0VDUkVUJyk7XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNlY3JldHNNYW5hZ2VyLmdldFNlY3JldFZhbHVlKHsgU2VjcmV0SWQ6IHNlY3JldElkIH0pLnByb21pc2UoKTtcbiAgY29uc3QgY3JlZHMgPSBKU09OLnBhcnNlKHJlc3VsdC5TZWNyZXRTdHJpbmchKTtcbiAgY29uc3QgdHdpdHRlciA9IG5ldyBUd2l0dGVyKGNyZWRzKTtcblxuXG4gIGNvbnN0IHF1ZXJ5ID0gZ2V0RW52KCdUV0lUVEVSX1FVRVJZJyk7XG5cbiAgLy8gcmVhZCBsYXN0IGNoZWNrcG9pbnQgKGNhbiBiZSB1bmRlZmluZWQpXG4gIGNvbnN0IGN1cnNvcl90YWlsID0gYXdhaXQgY2hlY2twb2ludC5nZXRMYXN0Q2hlY2twb2ludCgpO1xuICBjb25zb2xlLmxvZygnY3Vyc29yX3RhaWwgKGxhc3QgY2hlY2twb2ludCk6JywgY3Vyc29yX3RhaWwpO1xuXG4gIGxldCBuZXh0X2N1cnNvcl90YWlsID0gMDtcbiAgbGV0IGN1cnNvcl9oZWFkID0gdW5kZWZpbmVkO1xuICBjb25zdCByZXN1bHRzOiB7IFtpZDogc3RyaW5nXTogYm9vbGVhbiB9ID0geyB9O1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3QgcmVxID0geyBxOiBxdWVyeSwgY291bnQ6IEJBVENIX1NJWkUsIG1heF9pZDogY3Vyc29yX2hlYWQsIHNpbmNlX2lkOiBjdXJzb3JfdGFpbCB9O1xuICAgIGNvbnNvbGUubG9nKCd0d2l0dGVyIHNlYXJjaDonLCBKU09OLnN0cmluZ2lmeShyZXEpKTtcbiAgICBjb25zdCByZXM6IGFueSA9IGF3YWl0IHR3aXR0ZXIuZ2V0KCdzZWFyY2gvdHdlZXRzJywgcmVxKTtcblxuICAgIGxldCBtaW5faWQgPSByZXMuc2VhcmNoX21ldGFkYXRhLm1heF9pZDtcbiAgICBsZXQgbmV3X3R3ZWV0cyA9IDA7XG4gICAgZm9yIChjb25zdCBzdGF0dXMgb2YgcmVzLnN0YXR1c2VzKSB7XG4gICAgICBpZiAoc3RhdHVzLmlkIGluIHJlc3VsdHMpIHtcbiAgICAgICAgY29udGludWU7IC8vIGR1cGxpY2F0ZSAocG9zc2libGUpXG4gICAgICB9XG5cbiAgICAgIHJlc3VsdHNbc3RhdHVzLmlkXSA9IHRydWU7XG4gICAgICBuZXdfdHdlZXRzKys7XG5cbiAgICAgIC8vIHNlbmQgdHdlZXQgdG8gcXVldWVcbiAgICAgIGF3YWl0IHNxcy5zZW5kTWVzc2FnZSh7XG4gICAgICAgIFF1ZXVlVXJsOiBwcm9jZXNzLmVudi5RVUVVRV9VUkwhLFxuICAgICAgICBNZXNzYWdlQm9keTogSlNPTi5zdHJpbmdpZnkoc3RhdHVzKSxcbiAgICAgIH0pLnByb21pc2UoKTtcblxuICAgICAgLy8gdHJhY2sgbWluX2lkIHRvIHF1ZXJ5IG5leHQgcGFnZVxuICAgICAgaWYgKHN0YXR1cy5pZCA8IG1pbl9pZCkge1xuICAgICAgICBtaW5faWQgPSBzdGF0dXMuaWQ7XG4gICAgICB9XG5cbiAgICAgIC8vIGtlZXAgdHJhY2sgb2YgbmV4dCBjdXJzb3IgdGFpbCAodGhlIG1heGltdW0gaWQgd2UgcHJvY2Vzc2VkKVxuICAgICAgaWYgKHN0YXR1cy5pZCA+IG5leHRfY3Vyc29yX3RhaWwpIHtcbiAgICAgICAgbmV4dF9jdXJzb3JfdGFpbCA9IHN0YXR1cy5pZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhgcHVibGlzaGVkICR7bmV3X3R3ZWV0c30gbmV3IHR3ZWV0c2ApO1xuXG4gICAgLy8gaWYgd2UgaGF2ZW4ndCByZWNlaXZlZCBhbnkgbmV3IHR3ZWV0cywgd2UgYXJlIGRvbmUgaGVyZVxuICAgIGlmIChuZXdfdHdlZXRzID09PSAwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoT2JqZWN0LmtleXMocmVzdWx0cykubGVuZ3RoID4gTUFYX1JFU1VMVFMpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIGJyaW5nIGluIHRoZSBuZXh0IHBhZ2VcbiAgICBjdXJzb3JfaGVhZCA9IG1pbl9pZDtcbiAgfVxuXG4gIGlmIChjdXJzb3JfdGFpbCAhPT0gbmV4dF9jdXJzb3JfdGFpbCkge1xuICAgIGNvbnNvbGUubG9nKCdzdG9yaW5nIG1heF9pZCBjaGVja3BvaW50OicsIG5leHRfY3Vyc29yX3RhaWwpO1xuICAgIGF3YWl0IGNoZWNrcG9pbnQuY2hlY2twb2ludChuZXh0X2N1cnNvcl90YWlsKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnbm8gbmV3IGNoZWNrcG9pbnQnKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKCdyZXN1bHRzOicsIE9iamVjdC5rZXlzKHJlc3VsdHMpLmxlbmd0aCk7XG4gIHJldHVybiB7IGNvdW50OiByZXN1bHRzLmxlbmd0aCB9O1xufTtcbiJdfQ==