const { PubSub } = require("graphql-subscriptions");
const gql = require("graphql-tag");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const pubsub = new PubSub();

const typeDefs = gql`
  type Query {
    chats: [Chat]
  }

  type Chat {
    userId: ID
    body: String
  }

  type Subscription {
    newChat: Chat
  }
`;

const resolvers = {
  Subscription: {
    newChat: {
      subscribe: () => pubsub.asyncIterator("newChat"),
    },
  },
};

exports.pubsub = pubsub;
exports.schema = makeExecutableSchema({ typeDefs, resolvers, context: { pubsub } });
