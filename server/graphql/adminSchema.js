const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const RootQuery = require("./queries/adminQuery");
const RootMutation = require("./mutations/adminMuntation");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
