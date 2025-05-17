# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### TweetQueue <a name="TweetQueue" id="cdk-tweet-queue.TweetQueue"></a>

#### Initializers <a name="Initializers" id="cdk-tweet-queue.TweetQueue.Initializer"></a>

```typescript
import { TweetQueue } from 'cdk-tweet-queue'

new TweetQueue(parent: Construct, id: string, props: TweetQueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-tweet-queue.TweetQueue.Initializer.parameter.parent">parent</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-tweet-queue.TweetQueue.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-tweet-queue.TweetQueue.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-tweet-queue.TweetQueueProps">TweetQueueProps</a></code> | *No description.* |

---

##### `parent`<sup>Required</sup> <a name="parent" id="cdk-tweet-queue.TweetQueue.Initializer.parameter.parent"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-tweet-queue.TweetQueue.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-tweet-queue.TweetQueue.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-tweet-queue.TweetQueueProps">TweetQueueProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-tweet-queue.TweetQueue.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-tweet-queue.TweetQueue.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#cdk-tweet-queue.TweetQueue.addToResourcePolicy">addToResourcePolicy</a></code> | Adds a statement to the IAM resource policy associated with this queue. |
| <code><a href="#cdk-tweet-queue.TweetQueue.grant">grant</a></code> | Grant the actions defined in queueActions to the identity Principal given on this SQS queue resource. |
| <code><a href="#cdk-tweet-queue.TweetQueue.grantConsumeMessages">grantConsumeMessages</a></code> | Grant permissions to consume messages from a queue. |
| <code><a href="#cdk-tweet-queue.TweetQueue.grantPurge">grantPurge</a></code> | Grant an IAM principal permissions to purge all messages from the queue. |
| <code><a href="#cdk-tweet-queue.TweetQueue.grantSendMessages">grantSendMessages</a></code> | Grant access to send messages to a queue to the given identity. |
| <code><a href="#cdk-tweet-queue.TweetQueue.metric">metric</a></code> | Return the given named metric for this Queue. |
| <code><a href="#cdk-tweet-queue.TweetQueue.metricApproximateAgeOfOldestMessage">metricApproximateAgeOfOldestMessage</a></code> | The approximate age of the oldest non-deleted message in the queue. |
| <code><a href="#cdk-tweet-queue.TweetQueue.metricApproximateNumberOfMessagesDelayed">metricApproximateNumberOfMessagesDelayed</a></code> | The number of messages in the queue that are delayed and not available for reading immediately. |
| <code><a href="#cdk-tweet-queue.TweetQueue.metricApproximateNumberOfMessagesNotVisible">metricApproximateNumberOfMessagesNotVisible</a></code> | The number of messages that are in flight. |
| <code><a href="#cdk-tweet-queue.TweetQueue.metricApproximateNumberOfMessagesVisible">metricApproximateNumberOfMessagesVisible</a></code> | The number of messages available for retrieval from the queue. |
| <code><a href="#cdk-tweet-queue.TweetQueue.metricNumberOfEmptyReceives">metricNumberOfEmptyReceives</a></code> | The number of ReceiveMessage API calls that did not return a message. |
| <code><a href="#cdk-tweet-queue.TweetQueue.metricNumberOfMessagesDeleted">metricNumberOfMessagesDeleted</a></code> | The number of messages deleted from the queue. |
| <code><a href="#cdk-tweet-queue.TweetQueue.metricNumberOfMessagesReceived">metricNumberOfMessagesReceived</a></code> | The number of messages returned by calls to the ReceiveMessage action. |
| <code><a href="#cdk-tweet-queue.TweetQueue.metricNumberOfMessagesSent">metricNumberOfMessagesSent</a></code> | The number of messages added to a queue. |
| <code><a href="#cdk-tweet-queue.TweetQueue.metricSentMessageSize">metricSentMessageSize</a></code> | The size of messages added to a queue. |

---

##### `toString` <a name="toString" id="cdk-tweet-queue.TweetQueue.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="cdk-tweet-queue.TweetQueue.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="cdk-tweet-queue.TweetQueue.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addToResourcePolicy` <a name="addToResourcePolicy" id="cdk-tweet-queue.TweetQueue.addToResourcePolicy"></a>

```typescript
public addToResourcePolicy(statement: PolicyStatement): AddToResourcePolicyResult
```

Adds a statement to the IAM resource policy associated with this queue.

If this queue was created in this stack (`new Queue`), a queue policy
will be automatically created upon the first call to `addToPolicy`. If
the queue is imported (`Queue.import`), then this is a no-op.

###### `statement`<sup>Required</sup> <a name="statement" id="cdk-tweet-queue.TweetQueue.addToResourcePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `grant` <a name="grant" id="cdk-tweet-queue.TweetQueue.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: ...string[]): Grant
```

Grant the actions defined in queueActions to the identity Principal given on this SQS queue resource.

###### `grantee`<sup>Required</sup> <a name="grantee" id="cdk-tweet-queue.TweetQueue.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

Principal to grant right to.

---

###### `actions`<sup>Required</sup> <a name="actions" id="cdk-tweet-queue.TweetQueue.grant.parameter.actions"></a>

- *Type:* ...string[]

The actions to grant.

---

##### `grantConsumeMessages` <a name="grantConsumeMessages" id="cdk-tweet-queue.TweetQueue.grantConsumeMessages"></a>

```typescript
public grantConsumeMessages(grantee: IGrantable): Grant
```

Grant permissions to consume messages from a queue.

This will grant the following permissions:

  - sqs:ChangeMessageVisibility
  - sqs:DeleteMessage
  - sqs:ReceiveMessage
  - sqs:GetQueueAttributes
  - sqs:GetQueueUrl

If encryption is used, permission to use the key to decrypt the contents of the queue will also be granted to the same principal.

This will grant the following KMS permissions:

  - kms:Decrypt

###### `grantee`<sup>Required</sup> <a name="grantee" id="cdk-tweet-queue.TweetQueue.grantConsumeMessages.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

Principal to grant consume rights to.

---

##### `grantPurge` <a name="grantPurge" id="cdk-tweet-queue.TweetQueue.grantPurge"></a>

```typescript
public grantPurge(grantee: IGrantable): Grant
```

Grant an IAM principal permissions to purge all messages from the queue.

This will grant the following permissions:

 - sqs:PurgeQueue
 - sqs:GetQueueAttributes
 - sqs:GetQueueUrl

###### `grantee`<sup>Required</sup> <a name="grantee" id="cdk-tweet-queue.TweetQueue.grantPurge.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

Principal to grant send rights to.

---

##### `grantSendMessages` <a name="grantSendMessages" id="cdk-tweet-queue.TweetQueue.grantSendMessages"></a>

```typescript
public grantSendMessages(grantee: IGrantable): Grant
```

Grant access to send messages to a queue to the given identity.

This will grant the following permissions:

 - sqs:SendMessage
 - sqs:GetQueueAttributes
 - sqs:GetQueueUrl

If encryption is used, permission to use the key to encrypt/decrypt the contents of the queue will also be granted to the same principal.

This will grant the following KMS permissions:

 - kms:Decrypt
 - kms:Encrypt
 - kms:ReEncrypt*
 - kms:GenerateDataKey*

###### `grantee`<sup>Required</sup> <a name="grantee" id="cdk-tweet-queue.TweetQueue.grantSendMessages.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

Principal to grant send rights to.

---

##### `metric` <a name="metric" id="cdk-tweet-queue.TweetQueue.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Queue.

###### `metricName`<sup>Required</sup> <a name="metricName" id="cdk-tweet-queue.TweetQueue.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="cdk-tweet-queue.TweetQueue.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricApproximateAgeOfOldestMessage` <a name="metricApproximateAgeOfOldestMessage" id="cdk-tweet-queue.TweetQueue.metricApproximateAgeOfOldestMessage"></a>

```typescript
public metricApproximateAgeOfOldestMessage(props?: MetricOptions): Metric
```

The approximate age of the oldest non-deleted message in the queue.

Maximum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="cdk-tweet-queue.TweetQueue.metricApproximateAgeOfOldestMessage.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricApproximateNumberOfMessagesDelayed` <a name="metricApproximateNumberOfMessagesDelayed" id="cdk-tweet-queue.TweetQueue.metricApproximateNumberOfMessagesDelayed"></a>

```typescript
public metricApproximateNumberOfMessagesDelayed(props?: MetricOptions): Metric
```

The number of messages in the queue that are delayed and not available for reading immediately.

Maximum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="cdk-tweet-queue.TweetQueue.metricApproximateNumberOfMessagesDelayed.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricApproximateNumberOfMessagesNotVisible` <a name="metricApproximateNumberOfMessagesNotVisible" id="cdk-tweet-queue.TweetQueue.metricApproximateNumberOfMessagesNotVisible"></a>

```typescript
public metricApproximateNumberOfMessagesNotVisible(props?: MetricOptions): Metric
```

The number of messages that are in flight.

Maximum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="cdk-tweet-queue.TweetQueue.metricApproximateNumberOfMessagesNotVisible.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricApproximateNumberOfMessagesVisible` <a name="metricApproximateNumberOfMessagesVisible" id="cdk-tweet-queue.TweetQueue.metricApproximateNumberOfMessagesVisible"></a>

```typescript
public metricApproximateNumberOfMessagesVisible(props?: MetricOptions): Metric
```

The number of messages available for retrieval from the queue.

Maximum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="cdk-tweet-queue.TweetQueue.metricApproximateNumberOfMessagesVisible.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricNumberOfEmptyReceives` <a name="metricNumberOfEmptyReceives" id="cdk-tweet-queue.TweetQueue.metricNumberOfEmptyReceives"></a>

```typescript
public metricNumberOfEmptyReceives(props?: MetricOptions): Metric
```

The number of ReceiveMessage API calls that did not return a message.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="cdk-tweet-queue.TweetQueue.metricNumberOfEmptyReceives.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricNumberOfMessagesDeleted` <a name="metricNumberOfMessagesDeleted" id="cdk-tweet-queue.TweetQueue.metricNumberOfMessagesDeleted"></a>

```typescript
public metricNumberOfMessagesDeleted(props?: MetricOptions): Metric
```

The number of messages deleted from the queue.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="cdk-tweet-queue.TweetQueue.metricNumberOfMessagesDeleted.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricNumberOfMessagesReceived` <a name="metricNumberOfMessagesReceived" id="cdk-tweet-queue.TweetQueue.metricNumberOfMessagesReceived"></a>

```typescript
public metricNumberOfMessagesReceived(props?: MetricOptions): Metric
```

The number of messages returned by calls to the ReceiveMessage action.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="cdk-tweet-queue.TweetQueue.metricNumberOfMessagesReceived.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricNumberOfMessagesSent` <a name="metricNumberOfMessagesSent" id="cdk-tweet-queue.TweetQueue.metricNumberOfMessagesSent"></a>

```typescript
public metricNumberOfMessagesSent(props?: MetricOptions): Metric
```

The number of messages added to a queue.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="cdk-tweet-queue.TweetQueue.metricNumberOfMessagesSent.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricSentMessageSize` <a name="metricSentMessageSize" id="cdk-tweet-queue.TweetQueue.metricSentMessageSize"></a>

```typescript
public metricSentMessageSize(props?: MetricOptions): Metric
```

The size of messages added to a queue.

Average over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="cdk-tweet-queue.TweetQueue.metricSentMessageSize.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-tweet-queue.TweetQueue.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#cdk-tweet-queue.TweetQueue.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#cdk-tweet-queue.TweetQueue.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#cdk-tweet-queue.TweetQueue.fromQueueArn">fromQueueArn</a></code> | Import an existing SQS queue provided an ARN. |
| <code><a href="#cdk-tweet-queue.TweetQueue.fromQueueAttributes">fromQueueAttributes</a></code> | Import an existing queue. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-tweet-queue.TweetQueue.isConstruct"></a>

```typescript
import { TweetQueue } from 'cdk-tweet-queue'

TweetQueue.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-tweet-queue.TweetQueue.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="cdk-tweet-queue.TweetQueue.isOwnedResource"></a>

```typescript
import { TweetQueue } from 'cdk-tweet-queue'

TweetQueue.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="cdk-tweet-queue.TweetQueue.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="cdk-tweet-queue.TweetQueue.isResource"></a>

```typescript
import { TweetQueue } from 'cdk-tweet-queue'

TweetQueue.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="cdk-tweet-queue.TweetQueue.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromQueueArn` <a name="fromQueueArn" id="cdk-tweet-queue.TweetQueue.fromQueueArn"></a>

```typescript
import { TweetQueue } from 'cdk-tweet-queue'

TweetQueue.fromQueueArn(scope: Construct, id: string, queueArn: string)
```

Import an existing SQS queue provided an ARN.

###### `scope`<sup>Required</sup> <a name="scope" id="cdk-tweet-queue.TweetQueue.fromQueueArn.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct.

---

###### `id`<sup>Required</sup> <a name="id" id="cdk-tweet-queue.TweetQueue.fromQueueArn.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `queueArn`<sup>Required</sup> <a name="queueArn" id="cdk-tweet-queue.TweetQueue.fromQueueArn.parameter.queueArn"></a>

- *Type:* string

queue ARN (i.e. arn:aws:sqs:us-east-2:444455556666:queue1).

---

##### `fromQueueAttributes` <a name="fromQueueAttributes" id="cdk-tweet-queue.TweetQueue.fromQueueAttributes"></a>

```typescript
import { TweetQueue } from 'cdk-tweet-queue'

TweetQueue.fromQueueAttributes(scope: Construct, id: string, attrs: QueueAttributes)
```

Import an existing queue.

###### `scope`<sup>Required</sup> <a name="scope" id="cdk-tweet-queue.TweetQueue.fromQueueAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="cdk-tweet-queue.TweetQueue.fromQueueAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="cdk-tweet-queue.TweetQueue.fromQueueAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_sqs.QueueAttributes

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-tweet-queue.TweetQueue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-tweet-queue.TweetQueue.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#cdk-tweet-queue.TweetQueue.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#cdk-tweet-queue.TweetQueue.property.fifo">fifo</a></code> | <code>boolean</code> | Whether this queue is an Amazon SQS FIFO queue. |
| <code><a href="#cdk-tweet-queue.TweetQueue.property.queueArn">queueArn</a></code> | <code>string</code> | The ARN of this queue. |
| <code><a href="#cdk-tweet-queue.TweetQueue.property.queueName">queueName</a></code> | <code>string</code> | The name of this queue. |
| <code><a href="#cdk-tweet-queue.TweetQueue.property.queueUrl">queueUrl</a></code> | <code>string</code> | The URL of this queue. |
| <code><a href="#cdk-tweet-queue.TweetQueue.property.encryptionMasterKey">encryptionMasterKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | If this queue is encrypted, this is the KMS key. |
| <code><a href="#cdk-tweet-queue.TweetQueue.property.encryptionType">encryptionType</a></code> | <code>aws-cdk-lib.aws_sqs.QueueEncryption</code> | Whether the contents of the queue are encrypted, and by what type of key. |
| <code><a href="#cdk-tweet-queue.TweetQueue.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.DeadLetterQueue</code> | If this queue is configured with a dead-letter queue, this is the dead-letter queue settings. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-tweet-queue.TweetQueue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="cdk-tweet-queue.TweetQueue.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="cdk-tweet-queue.TweetQueue.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `fifo`<sup>Required</sup> <a name="fifo" id="cdk-tweet-queue.TweetQueue.property.fifo"></a>

```typescript
public readonly fifo: boolean;
```

- *Type:* boolean

Whether this queue is an Amazon SQS FIFO queue.

If false, this is a standard queue.

---

##### `queueArn`<sup>Required</sup> <a name="queueArn" id="cdk-tweet-queue.TweetQueue.property.queueArn"></a>

```typescript
public readonly queueArn: string;
```

- *Type:* string

The ARN of this queue.

---

##### `queueName`<sup>Required</sup> <a name="queueName" id="cdk-tweet-queue.TweetQueue.property.queueName"></a>

```typescript
public readonly queueName: string;
```

- *Type:* string

The name of this queue.

---

##### `queueUrl`<sup>Required</sup> <a name="queueUrl" id="cdk-tweet-queue.TweetQueue.property.queueUrl"></a>

```typescript
public readonly queueUrl: string;
```

- *Type:* string

The URL of this queue.

---

##### `encryptionMasterKey`<sup>Optional</sup> <a name="encryptionMasterKey" id="cdk-tweet-queue.TweetQueue.property.encryptionMasterKey"></a>

```typescript
public readonly encryptionMasterKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

If this queue is encrypted, this is the KMS key.

---

##### `encryptionType`<sup>Optional</sup> <a name="encryptionType" id="cdk-tweet-queue.TweetQueue.property.encryptionType"></a>

```typescript
public readonly encryptionType: QueueEncryption;
```

- *Type:* aws-cdk-lib.aws_sqs.QueueEncryption

Whether the contents of the queue are encrypted, and by what type of key.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="cdk-tweet-queue.TweetQueue.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: DeadLetterQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.DeadLetterQueue

If this queue is configured with a dead-letter queue, this is the dead-letter queue settings.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-tweet-queue.TweetQueue.property.PROPERTY_INJECTION_ID">PROPERTY_INJECTION_ID</a></code> | <code>string</code> | Uniquely identifies this class. |

---

##### `PROPERTY_INJECTION_ID`<sup>Required</sup> <a name="PROPERTY_INJECTION_ID" id="cdk-tweet-queue.TweetQueue.property.PROPERTY_INJECTION_ID"></a>

```typescript
public readonly PROPERTY_INJECTION_ID: string;
```

- *Type:* string

Uniquely identifies this class.

---

## Structs <a name="Structs" id="Structs"></a>

### TweetQueueProps <a name="TweetQueueProps" id="cdk-tweet-queue.TweetQueueProps"></a>

#### Initializer <a name="Initializer" id="cdk-tweet-queue.TweetQueueProps.Initializer"></a>

```typescript
import { TweetQueueProps } from 'cdk-tweet-queue'

const tweetQueueProps: TweetQueueProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-tweet-queue.TweetQueueProps.property.query">query</a></code> | <code>string</code> | The twitter query string to stream. |
| <code><a href="#cdk-tweet-queue.TweetQueueProps.property.secretArn">secretArn</a></code> | <code>string</code> | The SecretsManager secret that contains Twitter authentication credentials from https://apps.twitter.com/ with the following attributes (exact names):  - consumer_key  - consumer_secret  - access_token_key  - access_token_secret. |
| <code><a href="#cdk-tweet-queue.TweetQueueProps.property.intervalMin">intervalMin</a></code> | <code>number</code> | Polling interval in minutes. |
| <code><a href="#cdk-tweet-queue.TweetQueueProps.property.retentionPeriodSec">retentionPeriodSec</a></code> | <code>number</code> | Number of seconds for messages to wait in the queue for processing. |
| <code><a href="#cdk-tweet-queue.TweetQueueProps.property.visibilityTimeoutSec">visibilityTimeoutSec</a></code> | <code>number</code> | Number of seconds for messages to be invisible while they are processed. |

---

##### `query`<sup>Required</sup> <a name="query" id="cdk-tweet-queue.TweetQueueProps.property.query"></a>

```typescript
public readonly query: string;
```

- *Type:* string

The twitter query string to stream.

---

##### `secretArn`<sup>Required</sup> <a name="secretArn" id="cdk-tweet-queue.TweetQueueProps.property.secretArn"></a>

```typescript
public readonly secretArn: string;
```

- *Type:* string

The SecretsManager secret that contains Twitter authentication credentials from https://apps.twitter.com/ with the following attributes (exact names):  - consumer_key  - consumer_secret  - access_token_key  - access_token_secret.

---

##### `intervalMin`<sup>Optional</sup> <a name="intervalMin" id="cdk-tweet-queue.TweetQueueProps.property.intervalMin"></a>

```typescript
public readonly intervalMin: number;
```

- *Type:* number
- *Default:* 1min

Polling interval in minutes.

Set to 0 to disable polling.

---

##### `retentionPeriodSec`<sup>Optional</sup> <a name="retentionPeriodSec" id="cdk-tweet-queue.TweetQueueProps.property.retentionPeriodSec"></a>

```typescript
public readonly retentionPeriodSec: number;
```

- *Type:* number
- *Default:* 60 seconds

Number of seconds for messages to wait in the queue for processing.

After this time, messages will be removed from the queue.

---

##### `visibilityTimeoutSec`<sup>Optional</sup> <a name="visibilityTimeoutSec" id="cdk-tweet-queue.TweetQueueProps.property.visibilityTimeoutSec"></a>

```typescript
public readonly visibilityTimeoutSec: number;
```

- *Type:* number
- *Default:* 60 seconds

Number of seconds for messages to be invisible while they are processed.

Based on the amount of time it would require to process a single message.

---



