# API Reference

**Classes**

Name|Description
----|-----------
[TweetQueue](#cdk-tweet-queue-tweetqueue)|*No description*


**Structs**

Name|Description
----|-----------
[TweetQueueProps](#cdk-tweet-queue-tweetqueueprops)|*No description*



## class TweetQueue  <a id="cdk-tweet-queue-tweetqueue"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable), [IResource](#aws-cdk-lib-iresource), [IDependable](#constructs-idependable), [IConstruct](#constructs-iconstruct), [aws_sqs.IQueue](#aws-cdk-lib-aws-sqs-iqueue), [IDependable](#constructs-idependable), [IConstruct](#constructs-iconstruct), [IResource](#aws-cdk-lib-iresource)
__Extends__: [aws_sqs.Queue](#aws-cdk-lib-aws-sqs-queue)

### Initializer




```ts
new TweetQueue(parent: Construct, id: string, props: TweetQueueProps)
```

* **parent** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[TweetQueueProps](#cdk-tweet-queue-tweetqueueprops)</code>)  *No description*
  * **query** (<code>string</code>)  The twitter query string to stream. 
  * **secretArn** (<code>string</code>)  The SecretsManager secret that contains Twitter authentication credentials from https://apps.twitter.com/ with the following attributes (exact names):   - consumer_key   - consumer_secret   - access_token_key   - access_token_secret. 
  * **intervalMin** (<code>number</code>)  Polling interval in minutes. __*Default*__: 1min
  * **retentionPeriodSec** (<code>number</code>)  Number of seconds for messages to wait in the queue for processing. __*Default*__: 60 seconds
  * **visibilityTimeoutSec** (<code>number</code>)  Number of seconds for messages to be invisible while they are processed. __*Default*__: 60 seconds




## struct TweetQueueProps  <a id="cdk-tweet-queue-tweetqueueprops"></a>






Name | Type | Description 
-----|------|-------------
**query** | <code>string</code> | The twitter query string to stream.
**secretArn** | <code>string</code> | The SecretsManager secret that contains Twitter authentication credentials from https://apps.twitter.com/ with the following attributes (exact names):   - consumer_key   - consumer_secret   - access_token_key   - access_token_secret.
**intervalMin**? | <code>number</code> | Polling interval in minutes.<br/>__*Default*__: 1min
**retentionPeriodSec**? | <code>number</code> | Number of seconds for messages to wait in the queue for processing.<br/>__*Default*__: 60 seconds
**visibilityTimeoutSec**? | <code>number</code> | Number of seconds for messages to be invisible while they are processed.<br/>__*Default*__: 60 seconds



