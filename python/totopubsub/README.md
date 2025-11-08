# Using Toto PubSub for Python

## Publishing a message
To publish a message: 
1. Create a `Context` object. See [Context](#context)
2. Instantiate the PubSub publisher. 
3. Create the message. See [TotoMessageData](#totomessagedata)
4. Publish the message

```
    # 1. Create a `Context` object
    pubsub_context = Context(
        correlation_id=exec_context.cid,
        region=exec_context.config.region,
        hyperscaler=exec_context.config.hyperscaler
    )
    
    # 2. Instantiate the PubSub publisher.
    event_publisher = PubSubFactory.create_pubsub(pubsub_context)
    
    # 3. Create the message
    msg = TotoMessageData(
        id="my_identifier",
        event_name="event_name",
        msg=f"Just a string message",
        data={
            "key_1": "value_1", 
            "key_2": "value_2", 
            ...
        }
    )
    
    # 4. Publish the message
    event_publisher.publish_message(topic_name="my_topic", message=msg)

``` 

## API
### Context
The Context object contains some generic information needed by the PubSub implementations: 

*   `correlation_id` - just used to allow the user to correlate logs. Can be an empty string. 

*   `region` - the region of the cloud provider where this is going to run. <br>
    E.g. If running on GCP could be `eu-west1` <br>
    E.g. If running on AWS could be `eu-west-1`

*   `hyperscaler` - a string representing the hyperscaler. <br>
    Can be only `"aws"` or `"gcp"`

### TotoMessageData
Represents the message to send to the pub sub topic. 

*   `id` - An identifier that can be used by the receiver (e.g. the id of the resource that this event is linked to). <br>
    You can pass an empty string if you don't plan to use this. 

*   `event_name` - The name of the event (e.g. 'userCreated'). <br>
    This is completely custom to your context. 

*   `msg` - A string message. Not very useful (kept for legacy reasons), but can be used for logging. 

*   `data` - A dict that contains anything you want to pass with the event (for fat events - payload).
