// const { PubSub } = require("graphql-subscriptions");
// const graphql = require("graphql");
// const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
//   graphql;
// const ChatType = require("../graphql/types/chat");
// const pubsub = new PubSub();

// const CHAT = "chat";

// const Subscription = new GraphQLObjectType({
//   name: "Subscription",
//   fields: {
//     chatAdd: {
//       type: ChatType,
//       subscribe: () => {
//         pubsub.asyncIterator(CHAT);
//       },
//     },
//   },
// });

// module.exports = Subscription;
