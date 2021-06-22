const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;

const FollowingModel = require("../../models/following");
const User = require("../../models/user");

const Follow = new GraphQLObjectType({
  name: "follow",
  fields: () => ({
    following: { type: GraphQLID },
    followers: { type: GraphQLID },
    follow: { type: GraphQLBoolean },
    id: { type: GraphQLID },
    user: { type: GraphQLID },
    message: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
  }),
});
module.exports = Follow;

const userType = require("../types/userType");
