const graphql = require("graphql");

const { GraphQLObjectType, GraphQLInt, GraphQLBoolean } = graphql;

const followings = new GraphQLObjectType({
  name: "followings",
  fields: () => ({
    followingId: { type: GraphQLInt },
  }),
});

module.exports = followings;
