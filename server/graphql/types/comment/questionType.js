const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//=========modell===============
const question = require("../../../models/comment/question");
const answer = require("../../../models/comment/answer");

const QuestionType = new GraphQLObjectType({
  name: "question",
  fields: () => ({
    id: { type: GraphQLID },
    message: {
      type: GraphQLString,
    },
    userId: {
      type: GraphQLID,
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
