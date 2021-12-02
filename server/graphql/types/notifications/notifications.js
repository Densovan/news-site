const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;

const follownotification = require("../../../models/notifications/followNotification");
const likenotification = require("../../../models/notifications/likeNotification");

const NotificationTypes = new GraphQLObjectType({
  name: "notificat",
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    userId: { type: GraphQLID }, // === context.id
    postUserId: { type: GraphQLID }, //get like by in news collection
    postId: { type: GraphQLID }, //get like by in news collection
    followingId: { type: GraphQLID },
    followerId: { type: GraphQLID },
    type: { type: GraphQLString },
    likes: {
      type: likeType,
      resolve: async (parent, args, context) => {
        return likenotification.findOne({
          postId: parent.postId,
          postUserId: context.id,
        });
      },
    },
    follows: {
      type: followType,
      resolve: async (parent, args, context) => {
        const data = await follownotification.findOne({
          followingId: context.id,
          followerId: parent.followerId,
        });
        return data;
      },
    },
  }),
});

module.exports = NotificationTypes;

const followType = require("../../types/notifications/followNotification");
// const likeType = require("../../types/likes/likeArticleType");
const likeType = require("../../types/notifications/likenotificationType");
