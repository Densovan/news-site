const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//=========modell===============
const question = require("../../../models/comment/question");
const answer = require("../../../models/comment/answer");
const User = require("../../../models/user");

const QuestionType = new GraphQLObjectType({
  name: "question",
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
