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
    userId: {
      type: GraphQLID,
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
    user: {
      type: userType,
      resolve: (parent, args) => {
        return user.findById(parent.userId);
      },
    },
  }),
});
module.exports = AnswerType;
const userType = require("../userType");
