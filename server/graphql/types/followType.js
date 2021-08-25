const graphql = require("graphql");

//=============model=================
const User = require("../../models/user");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const FollowType = new GraphQLObjectType({
  name: "follow",
  fields: () => ({
    id: { type: GraphQLID },
    // userId: { type: GraphQLID },
    followBy: { type: GraphQLID },
    followTo: { type: GraphQLID },
    message: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    user: {
      type: userType,
      resolve: (parent, args, context) => {
        return User.findById(context.id);
      },
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

module.exports = FollowType;
//==========type==============
const userType = require("./userType");
