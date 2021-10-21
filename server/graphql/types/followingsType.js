const graphql = require("graphql");

const { GraphQLObjectType, GraphQLInt, GraphQLBoolean } = graphql;

const followings = new GraphQLObjectType({
  name: "followings",
  fields: () => ({
    followingsId: { type: GraphQLInt },
  }),
});

module.exports = followings;
