const graphql = require("graphql");

const { GraphQLObjectType, GraphQLInt, GraphQLBoolean } = graphql;

const followers = new GraphQLObjectType({
  name: "followers",
  fields: () => ({
    followingId: { type: GraphQLInt },
  }),
});

module.exports = followers;
