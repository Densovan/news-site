const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//=========modell===============
const question = require("../../../models/comment/question");
const answer = require("../../../models/comment/answer");
const user = require("../../../models/user");

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
    user: {
      type: userType,
      resolve: (parent, args) => {
        return user.findById(parent.userId);
      },
    },
  }),
});
module.exports = QuestionType;

const userType = require("../userType");
