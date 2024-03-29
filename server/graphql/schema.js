const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const RootQuery = require("./queries/clientQuery");
const RootMutation = require("./mutations/cilentMutation");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
