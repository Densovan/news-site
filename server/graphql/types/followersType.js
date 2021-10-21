const graphql = require("graphql");

const { GraphQLObjectType, GraphQLInt, GraphQLBoolean } = graphql;

const followers = new GraphQLObjectType({
  name: "followers",
  fields: () => ({
    followersId: { type: GraphQLInt },
  }),
});

module.exports = followers;
