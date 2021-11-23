const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;

const User = require("../../../models/user");

const LikeNotification = new GraphQLObjectType({
  name: "notificationType",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    postId: { type: GraphQLID },
    postUserId: { type: GraphQLID },
    likers: {
      type: userType,
      resolve: (parent, args) => {
        return User.findOne({ accountId: parent.userId });
      },
    },
  }),
});

module.exports = LikeNotification;

const userType = require("../userType");
