# Toto PubSub

Cloud-agnostic message bus abstraction for Node.js/TypeScript applications.

## Overview

`toto-pubsub` provides a unified interface for working with different message brokers and pub/sub systems, making it easy to switch between cloud providers or use local development queues.

## Supported Providers

- **AWS SQS** - Queue-based messaging
- **Google Cloud Pub/Sub** - Topic-based pub/sub messaging  
- **DevQ** - Local development queue

## Installation

```bash
npm install toto-pubsub
```

### Peer Dependencies

```bash
npm install toto-api-controller
```

### Optional Dependencies

Install only the cloud provider SDK you need:

```bash
# For AWS SQS
npm install @aws-sdk/client-sqs

# For Google Cloud Pub/Sub
npm install @google-cloud/pubsub
```

## Usage

### Basic Setup

```typescript
import { GaleMessageBus, MessageBusFactory, IMessageBus } from 'toto-pubsub';
import { SQSMessageBus } from 'toto-pubsub';
import { TotoControllerConfig } from 'toto-api-controller';

// Create a factory
class MyMessageBusFactory extends MessageBusFactory {
  createMessageBus(config: TotoControllerConfig): IMessageBus {
    // Return your chosen implementation
    return new SQSMessageBus('my-queue', 'us-east-1');
  }
}

// Initialize the message bus
const config: TotoControllerConfig = { /* your config */ };
const messageBus = new GaleMessageBus(new MyMessageBusFactory(), config);
```

### Publishing Messages

```typescript
// Publish a task
await messageBus.publishTask('my-topic', { taskData: 'value' }, 'correlation-id');
```

### Handling Messages (Queue-based)

```typescript
import { IQueue } from 'toto-pubsub';

// For queue-based message buses (SQS, DevQ)
if (messageBus instanceof IQueue) {
  messageBus.setMessageHandler(async (msgPayload) => {
    const message = messageBus.decodeMessage(msgPayload);
    console.log('Received message:', message);
    // Process message...
  });
}
```

## API

### GaleMessageBus

Main message bus class that wraps different implementations.

- `decodeMessage(msgPayload: any): GaleMessage` - Decodes a message from the underlying provider
- `publishTask(topicOrQueue: string, task: any, cid: string): Promise<void>` - Publishes a task message
- `handleMessage(msgPayload: any, handler: Function): Promise<void>` - Handles incoming messages

### MessageBusFactory

Abstract factory for creating message bus instances.

- `createMessageBus(config: TotoControllerConfig): IMessageBus` - Creates a message bus implementation

### IMessageBus

Base interface for all message bus implementations.

- `publishMessage(topicOrQueue: string, msgPayload: any): Promise<void>`
- `decodeMessage(msgPayload: any): GaleMessage`

### IQueue

Extended interface for queue-based message buses.

- `setMessageHandler(handler: Function): void`
- `close(): Promise<void>`

### GaleMessage

Standard message format used across all implementations.

```typescript
{
  type: GaleMessageType;    // Message type
  cid: string;              // Correlation ID
  timestamp: number;        // Timestamp in milliseconds
  payload: any;             // Message payload
}
```

## Examples

### AWS SQS

```typescript
import { SQSMessageBus } from 'toto-pubsub';

const sqsBus = new SQSMessageBus('my-queue-name', 'us-east-1');

// Set up message handler
sqsBus.setMessageHandler(async (msgPayload) => {
  const message = sqsBus.decodeMessage(msgPayload);
  console.log('Processing message:', message);
});

// Publish a message
await sqsBus.publishMessage('queue-name', { data: 'value' });
```

### Google Cloud Pub/Sub

```typescript
import { PubSubMessageBus } from 'toto-pubsub';

const pubsubBus = new PubSubMessageBus();

// Publish a message
await pubsubBus.publishMessage('topic-name', { data: 'value' });
```

### DevQ (Local Development)

```typescript
import { DevQMessageBus } from 'toto-pubsub';

const devqBus = new DevQMessageBus('http://localhost:8080', config);

// Publish a message
await devqBus.publishMessage('queue-name', { data: 'value' });
```

## License

ISC

## Repository

https://github.com/nicolasances/toto-pubsub
