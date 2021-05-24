const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = graphql;
//================type===============
const NewsType = require("../types/newsType");
//===============model===============
const NewsModel = require("../../models/news");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    //============add category=============
    add_news: {
      type: NewsType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        des: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLID) },
        type: { type: new GraphQLNonNull(GraphQLID) },
        thumnail: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parents, args, context) => {
        try {
          const news = new NewsModel({ ...args, createBy: context.id });
          await news.save();
          return {
            message: "Add News Successful",
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
  },
});
module.exports = RootMutation;
