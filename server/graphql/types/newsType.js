const graphql = require("graphql");

//=============model=============
const Category = require("../../models/category");
const Type = require("../../models/type");
const User = require("../../models/user");
const Question = require("../../models/comment/question");
const Answer = require("../../models/comment/answer");
const Like = require("../../models/like");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const NewsType = new GraphQLObjectType({
  name: "news",
  fields: () => ({
    title: { type: GraphQLString },
    des: { type: GraphQLString },
    category: { type: GraphQLString },
    thumnail: { type: GraphQLString },
    type: { type: GraphQLString },
    message: { type: GraphQLString },
    slug: { type: GraphQLString },
    createBy: { type: GraphQLID },
    createdAt: {
      type: GraphQLString,
    },
    updateAt: {
      type: GraphQLString,
    },
    followTo: { type: GraphQLString },
    status: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
    categories: {
      type: categoryType,
      resolve: (parents, args) => {
        return Category.findById(parents.category);
      },
    },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.createBy);
      },
    },
    types: {
      type: type,
      resolve: (parents, args) => {
        return Type.findById(parents.type);
      },
    },
    comment: {
      type: GraphQLList(questionType),
      resolve: (parent, args) => {
        return Question.find({ postId: parent.id });
      },
    },
    reply: {
      type: GraphQLList(answerType),
      resolve: (parent, args) => {
        return Answer.find({ postId: parent.id });
      },
    },
    like: {
      type: GraphQLList(likeType),
      resolve: (parent, args) => {
        return Like.find({ postId: parent.id });
      },
    },
    // get_news_by_following: {
    //   type: GraphQLList(NewsType),
    //   resolve: (parent, args) => {
    //     return User.find({follow})
    //   }
    // }
  }),
});

module.exports = NewsType;

//=============type===========
const categoryType = require("./categoryType");
const type = require("./type");
const userType = require("./userType");
const questionType = require("./comment/questionType");
const answerType = require("./comment/answerType");
const likeType = require("./likeType");
