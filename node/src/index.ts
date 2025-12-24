/**
 * toto-pubsub - Cloud-agnostic message bus abstraction
 * 
 * Provides a unified interface for working with different message brokers:
 * - AWS SQS
 * - Google Cloud Pub/Sub
 * - DevQ (for local development)
 */

// Export main message bus classes and interfaces
export { 
    MessageBusFactory, 
    IMessageBus, 
    IQueue, 
} from './bus/MessageBus';

// Export AWS implementations
export { SQSMessageBus } from './bus/impl/aws/SQS';

// Export Google Cloud implementations
export { PubSubMessageBus } from './bus/impl/google/PubSub';
export { DevQMessageBus } from './bus/impl/google/DevQ';
