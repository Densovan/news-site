const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//=========modell===============
const question = require("../../../models/comment/question");
const answer = require("../../../models/comment/answer");
const user = require("../../../models/user");

const AnswerType = new GraphQLObjectType({
  name: "answer",
  fields: () => ({
    id: { type: GraphQLID },
    message: {
      type: GraphQLString,
    },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.userId);
      },
    },
    postId: {
      type: GraphQLString,
    },
    answer: {
      type: GraphQLString,
    },
    questionId: {
      type: GraphQLID,
    },
    answerId: {
      type: GraphQLID,
    },
    createdAt: {
      type: GraphQLString,
    },
    updateAt: {
      type: GraphQLString,
    },
    // question: {
    //   type: userType,
    //   resolve: (parent, args) => {
    //     return Question.findById(parent.questionId);
    //   },
    // },
    // article: {
    //   type: userType,
    //   resolve: (parents, args) => {
    //     return User.findById(parents.userId);
    //   },
    // }
  }),
});
module.exports = AnswerType;
const userType = require("../userType");const Question = require("../../../models/comment/question");

