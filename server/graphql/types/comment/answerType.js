const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//=========modell===============
const question = require("../../../models/comment/question");
const answer = require("../../../models/comment/answer");
const User = require("../../../models/user");
const News = require("../../../models/news");

const AnswerType = new GraphQLObjectType({
  name: "answer",
  fields: () => ({
    id: { type: GraphQLID },
    message: {
      type: GraphQLString,
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
    ownerId: {
      type: GraphQLID,
    },
    userIdTo: {
      type: GraphQLID,
    },
    type: { type: GraphQLString },
    notifications: {
      type: new GraphQLList(objectNotification),
    },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findOne({ accountId: parents.userIdTo });
      },
    },
    userTo: {
      type: userType,
      resolve: (parents, args) => {
        return User.findOne({ accountId: parents.userId  });
      },
    },
    news: {
      type: newsType,
      resolve: (parents, args) => {
        return News.findById(parents.postId);
      },
    },
  }),
});
module.exports = AnswerType;
const userType = require("../userType");
const Question = require("../../../models/comment/question");
const newsType = require("../newsType");
const objectNotification = require("../objectNotificationType")
