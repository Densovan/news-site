const graphql = require("graphql");

//=============model=================
const User = require("../../models/user");
const News = require("../../models/news");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;

const LikeTopDownType = new GraphQLObjectType({
  name: "likeTopDonw",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    createdAt: {
      type: GraphQLString,
    },
    like_count: {
      type: GraphQLInt,
    },
    type: {
      type: GraphQLString,
    },
    // countDonw: {
    //   type: GraphQLID,
    // },
    postId: {
      type: GraphQLID,
    },
    ownerId: {
      type: GraphQLID,
    },
    message: {
      type: GraphQLString,
    },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.userId);
      },
    },
    article: {
      type: newsTypw,
      resolve: (parents, args) => {
        return News.findById(parents.postId);
      },
    },
  }),
});

module.exports = LikeTopDownType;

//==========type==============
const userType = require("./userType");
const newsTypw = require("./newsType");
