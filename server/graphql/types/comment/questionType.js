const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//=========modell===============
const question = require("../../../models/comment/question");
const answer = require("../../../models/comment/answer");
const User = require("../../../models/user");
const News = require("../../../models/news");

const QuestionType = new GraphQLObjectType({
  name: "question",
  fields: () => ({
    id: { type: GraphQLID },
    message: {
      type: GraphQLString,
    },
    userId: { type: GraphQLID },
    createdAt: {
      type: GraphQLString,
    },
    updateAt: {
      type: GraphQLString,
    },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.userId);
      },
    },
    article:{
      type: newsType,
      resolve: (parents, args) => {
        return News.findById(parents.postId);
      },
    },
    postId: {
      type: GraphQLID,
    },
    question: {
      type: GraphQLString,
    },
    answerId: {
      type: GraphQLID,
    },
  }),
});
module.exports = QuestionType;

const userType = require("../userType");
const newsType = require("../newsType");
