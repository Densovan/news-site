const graphql = require("graphql");

//=============model=================
const User = require("../../models/user");
const News = require("../../models/news");
const Like = require("../../models/like");
const Question = require("../../models/comment/question");
const Answer = require("../../models/comment/answer");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const NotiType = new GraphQLObjectType({
  name: "noti",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    createdAt: {
      type: GraphQLString,
    },
    postId: {
      type: GraphQLID,
    },
    like: {
      type: GraphQLString,
    },
    question: {
      type: GraphQLString,
    },
    ownerId: {
      type: GraphQLID,
    },
    answer: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
    message: {
      type: GraphQLString,
    },
    followTo: {
      type: GraphQLString,
    },
    followBy: {
      type: GraphQLString,
    },
    questionId: { type: GraphQLID },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.userId);
      },
    },
    news: {
      type: newsType,
      resolve: (parent, args) => {
        return News.findById(parent.postId);
      },
    },
  }),
});

module.exports = NotiType;

//==========type==============
const userType = require("./userType");
const newsType = require("./newsType");
const likeType = require("./likeType");
const questionType = require("./comment/questionType");
const answerType = require("./comment/questionType");
