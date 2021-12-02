const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;

const User = require("../../../models/user");

const FollowNotification = new GraphQLObjectType({
  name: "follownotificationType",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    followerId: { type: GraphQLID },
    followingId: { type: GraphQLID },
    follows: {
      type: userType,
      resolve: async (parent, args) => {
        return User.findOne({ accountId: parent.followingId });
      },
    },
    // followings: {
    //   type: followType,
    //   resolve: (parent, args, context) => {
    //     return User.findOne({ accountId: context.id });
    //   },
    // },
  }),
});

module.exports = FollowNotification;

const userType = require("../userType");
const followType = require("../follows/followers");
