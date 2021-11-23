const graphql = require("graphql");

//=============model=================
const User = require("../../models/user");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} = graphql;

const FollowType = new GraphQLObjectType({
  name: "follow",
  fields: () => ({
    id: { type: GraphQLID },
    followBy: { type: GraphQLID },
    followTo: { type: GraphQLID },
    message: { type: GraphQLString },
    type: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    notifications: {
      type: new GraphQLList(objectNotification),
    },
    user: {
      type: userType,
      resolve: (parent, args, context) => {
        // return User.findOne({ userId: context.id });
        return User.findOne({ accountId: context.id });

        // resolve: (parents, args, context) => {
        //   return User.findById(parents.followBy);
      },
    },

    userFollower: {
      type: userType,
      resolve: (parents, args) => {
        // return User.findById(parents.followBy);
        return User.findOne({ accountId: parents.followBy });
      },
    },
    userFollowing: {
      type: userType,
      resolve: (parents, args) => {
        // return User.findById(parents.followTo);
        return User.findOne({ accountId: parents.followTo });
      },
    },
  }),
});

module.exports = FollowType;
//==========type==============
const userType = require("./userType");
const objectNotification = require("./objectNotificationType");
