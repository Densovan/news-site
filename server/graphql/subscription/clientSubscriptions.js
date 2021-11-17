const { PubSub } = require("graphql-subscriptions");
const graphql = require("graphql");
const { compare } = require("bcryptjs");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;
const TestType = require("../types/typeTest")

const pubSub = new PubSub();

const Subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    newTest: {
      type: TestType,
      subscribe: () => {
        return pubSub.asyncIterator("NEW_TEST");
      }
    },
  },
});

module.exports = Subscription;