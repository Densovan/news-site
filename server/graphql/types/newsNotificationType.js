const graphql = require("graphql");

//=============model=================
const User = require("../../models/user");
const News = require("../../models/news");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} = graphql;

const NewsNotificationType = new GraphQLObjectType({
  name: "NewsNotificationType",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    postId: { type: GraphQLID },
    createdAt: {
      type: GraphQLString,
    },
    message: {
      type: GraphQLString,
    },
    type: { type: GraphQLString },
    read: { type: GraphQLBoolean },
    count: { type: GraphQLInt },
    checkNotification: { type: new GraphQLList(checknotificationType) },

    // checkNotification: {
    //   type: GraphQLList(checknotificationType),
    // },
    // checkNotifications: [Schema.Types.Mixed],
    user: {
      type: userType,
      resolve: (parents, args) => {
        // return User.findById(parents.userId);
        return User.findOne({ accountId: parents.userId });
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

module.exports = NewsNotificationType;

//==========type==============
const checknotificationType = require("./checkNotifications");
const userType = require("./userType");
const newsType = require("./newsType");
