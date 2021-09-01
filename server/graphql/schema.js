const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const RootQuery = require("./queries/clientQuery");
const RootMutation = require("./mutations/cilentMutation");
// const Subscription = require("../graphql/subscriptions");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  // subscription: Subscription,
});
