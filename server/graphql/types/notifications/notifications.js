const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;

const likenotification = require("../../../models/notifications/likeNotification");

const NotificationTypes = new GraphQLObjectType({
  name: "notificat",
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    userId: { type: GraphQLID },
    postUserId: { type: GraphQLID },
    postId: { type: GraphQLID },
    type: { type: GraphQLString },
    likes: {
      type: likeType,
      resolve: async (parent, args, context) => {
        return likenotification.findOne({
          postId: parent.postId,
          userId: context.id,
        });
      },
    },
  }),
});

module.exports = NotificationTypes;

const likeType = require("../../types/notifications/likenotificationType");
