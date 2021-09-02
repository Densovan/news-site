const { PubSub } = require("graphql-subscriptions");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;

const pubsub = new PubSub();

const ChatType = require("../../graphql/types/chat");

const CHAT = "chat";

const Subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    chatAdd: {
      type: ChatType,
      subscribe: () => {
        pubsub.asyncIterator(CHAT);
      },
    },
    // messages: {
    //   subscribe: (parent, args) => {
    //     const channel = Math.random().toString(36).slice(2, 15);
    //     onMessagesUpdates(() => pubsub.publish(channel, { messages }));
    //     setTimeout(() => pubsub.publish(channel, { messages }), 0);
    //     return pubsub.asyncIterator(channel);
    //   },
    // },
  },
});

module.exports = Subscription;