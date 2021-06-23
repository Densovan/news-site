const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//=========modell===============
const question = require("../../../models/comment/question");
const answer = require("../../../models/comment/answer");

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
  }),
});
module.exports = AnswerType;
