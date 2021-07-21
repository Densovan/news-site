const graphql = require("graphql");

//=============model=================
const User = require("../../models/user");
const News = require("../../models/news");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;

const LikeType = new GraphQLObjectType({
  name: "like",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    createdAt: {
      type: GraphQLString,
    },
    count:{
      type: GraphQLInt
    },
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
    }
  }),
});

module.exports = LikeType;

//==========type==============
const userType = require("./userType");
const newsTypw = require("./newsType");
