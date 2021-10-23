const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} = require("graphql");

//=============model=================
const User = require("../../models/user");
const News = require("../../models/news");

const ConversationNotificationType = new GraphQLObjectType({
  name: "ConversationNotificationType",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    postId: { type: GraphQLID },
    message: {
      type: GraphQLString,
    },
    ownerId: { type: GraphQLID },
    userId2: { type: GraphQLID },
    type: { type: GraphQLString },
    notifications: {
      type: new GraphQLList(objectNotification),
    },
    createdAt: {
      type: GraphQLString,
    },
    accountId: {
      type: GraphQLID,
    },
    user: {
      type: userType,
      resolve: (parents, args) => {
        // return User.findById(parents.userId);
        return User.findOne({ accountId: parents.userId });
      },
    },
    userTo: {
      type: userType,
      resolve: (parents, args) => {
        // return User.findById(parents.userId2);
        return User.findOne({ accountId: parents.userId2 });
      },
    },
    news: {
      type: newsType,
      resolve: (parent, args) => {
        return News.findById(parent.postId);
      },
    },
    // comments: {
    //   type: questionType,
    //   resolve: (parent, args) => {
    //     return Comments.findById(parent.ownerId);
    //   },
    // },
  }),
});

module.exports = ConversationNotificationType;

//==========type==============
const userType = require("./userType");
const newsType = require("./newsType");
const objectNotification = require("./objectNotificationType")
