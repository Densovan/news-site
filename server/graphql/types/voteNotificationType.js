const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLInt } = require("graphql");

//=============model=================
const User = require("../../models/user");
const News = require("../../models/news");

const VoteNotificationType = new GraphQLObjectType({
  name: "VoteNotificationType",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    postId: { type: GraphQLID },
    message: {
        type: GraphQLString,
    },
    ownerId: { type: GraphQLID },
    read: { type: GraphQLBoolean },
    count: { type: GraphQLInt },
    type: { type: GraphQLString },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.userId);
      },
    },
    news: {
      type: newsType,
      resolve: (parent, args) => {
        return News.findById(parent.postId);
      },
    },
  }),
});

module.exports = VoteNotificationType;

//==========type==============
const userType = require("./userType");
const newsType = require("./newsType");
