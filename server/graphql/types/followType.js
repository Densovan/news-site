const graphql = require("graphql");

//=============model=================
const User = require("../../models/user");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt, GraphQLList } = graphql;

const FollowType = new GraphQLObjectType({
  name: "follow",
  fields: () => ({
    id: { type: GraphQLID },
    // userId: { type: GraphQLID },
    followBy: { type: GraphQLID },
    followTo: { type: GraphQLID },
    message: { type: GraphQLString },
    read: { type: GraphQLBoolean },
    count: { type: GraphQLInt },
    type: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    user: {
      type: userType,
      resolve: (parents, args, context) => {
        return User.findById(parents.followBy);
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
