const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const RootQuery = require("./queries/clientQuery");
const RootMutation = require("./mutations/clientMutation");
const RootSubscription = require("../graphql/subscription/clientSubscriptions");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubscription
});
