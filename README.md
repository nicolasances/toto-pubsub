# Toto PubSub

This is a utility project that provides an **agnostic** implementation of a PubSub publisher. 

So far it supports: 
* **AWS SNS**
* **GCP PubSub**

So far it supports: 
* **Node** (Typescript) - The node implementation is embedded in the [Toto API Controller](https://github.com/nicolasances/node-toto-api-controller) which already provides a way to manage cloud-agnostic pubsub.
* **Python** - Published on [PyPi](https://pypi.org/project/totopubsub)

## Documentation

* Python 
    * [Building the package](./python/README.md)
    * [Using Toto PubSub for Python](./python/totopubsub/README.md)