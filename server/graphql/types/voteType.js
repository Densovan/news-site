const graphql = require("graphql");

//=============model=================
const User = require("../../models/user");
const News = require("../../models/news");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;

const LikeTopDownType = new GraphQLObjectType({
  name: "vote",
  fields: () => ({
    id: { type: GraphQLID },
    message: {
      type: GraphQLString,
    },
    voteUp: {
      type: GraphQLInt,
    },
    voteDown: {
      type: GraphQLInt,
    },
    count: {
      type: GraphQLInt,
    },
    notifications: {
      type: new GraphQLList(objectNotification),
    },
    ownerId: { type: GraphQLID },
    postId: { type: GraphQLID },
    type: { type: GraphQLString },
    userId: { type: GraphQLID },
    createdAt: {
      type: GraphQLString,
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

module.exports = LikeTopDownType;

//==========type==============
const userType = require("./userType");
const newsType = require("./newsType");
const objectNotification = require("./objectNotificationType")
