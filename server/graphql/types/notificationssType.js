const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const LikesType = require("../types/likes/likeArticleType");
const newsType = require("../types/newsType");
const NotificationssType = new GraphQLObjectType({
  name: "notificationss",
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    userId: { type: GraphQLID },
    postId: { type: GraphQLID },
    postUserId: { type: GraphQLID },
    news: {
      type: new GraphQLList(newsType),
      resolve: async (parent, args, context) => {
        return NewsModel.findById({ _id: parent.postId });
      },
    },
  }),
});

module.exports = NotificationssType;

// const LikesModel = require("../../models/")
const NewsModel = require("../../models/news");
