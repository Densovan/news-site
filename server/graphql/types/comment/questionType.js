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
    ownerId: {
      type: GraphQLID,
    },
    updateAt: {
      type: GraphQLString,
    },
    type: { type: GraphQLString },
    notifications: {
      type: new GraphQLList(objectNotification),
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
    news: {
      type: newsType,
      resolve: (parent, args) => {
        return News.findById(parent.postId);
      },
    },
    user: {
      type: userType,
      resolve: (parents, args) => {
        // return User.findById(parents.userId);
        return User.findOne({ accountId: parents.userId });
      },
    },
  }),
});
module.exports = QuestionType;

const userType = require("../userType");
const newsType = require("../newsType");
const objectNotification = require("../objectNotificationType")
