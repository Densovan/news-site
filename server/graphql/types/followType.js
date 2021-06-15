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
    followTo: { type: GraphQLID },
    followBy: { type: GraphQLID },
    follow: { type: GraphQLBoolean },
    // followingCount: { type: GraphQLInt },
    // followerCount: { type: GraphQLInt },
    id: { type: GraphQLID },
    createBy: { type: GraphQLString },
    message: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    userFollower: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.followBy);
      },
    },
    userFollowing: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.followTo);
      },
    },
  }),
});
module.exports = Follow;

const userType = require("../types/userType");
