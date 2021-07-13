const graphql = require("graphql");

//=============model=============
const Category = require("../../models/category");
const Type = require("../../models/type");
const User = require("../../models/user");
const Question = require("../../models/comment/question");
const Answer = require("../../models/comment/answer");
const Like = require("../../models/like");
const News = require("../../models/news");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const NotificationType = new GraphQLObjectType({
  name: "notification",
  fields: () => ({
    message: { type: GraphQLString },
    userId: { type: GraphQLID },
    postId: {
      type: GraphQLID,
    },
    updateAt: {
      type: GraphQLString,
    },
    article:{
      type: GraphQLList(newsType),
      resolve: (parent, args) => {
        return News.find({ createBy: parent.userId });
      },
    },
    user: {
      type: userType,
      resolve: (parent, args) => {
        return User.findById(parent.userId);
      },
    },
    like: {
      type: GraphQLList(likeType),
      resolve: (parent, args) => {
        return Like.find({ postId: parent.postId });
      },
    }
    // like: {
    //   type: GraphQLList(likeType),
    //   resolve: (parent, args) => {
    //     return Like.find(parent.postId);
    //   },
    // },
    // question: {
    //   type: GraphQLList(questionType),
    //   resolve: (parent, args) => {
    //     return Question.find(parent.postId);
    //   },
    // },
    // answer: {
    //   type: GraphQLList(answerType),
    //   resolve: (parent, args) => {
    //     return Answer.find(parent.postId);
    //   },
    // },
  }),
});

module.exports = NotificationType;

//=============type===========
const categoryType = require("./categoryType");
const type = require("./type");
const userType = require("./userType");
const questionType = require("./comment/questionType");
const answerType = require("./comment/answerType");
const likeType = require("./likeType");
const newsType = require("./newsType");
