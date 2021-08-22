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
      type: GraphQLString 
    },
    voteUp: { 
      type: GraphQLInt 
    },
    voteDown: { 
      type: GraphQLInt 
    },
    count:{
      type: GraphQLInt
    },
    ownerId: { type: GraphQLID},
    postId: { type: GraphQLID},
    type: { type: GraphQLString },
    userId: { type: GraphQLID },
    createdAt: {
      type: GraphQLString,
    },
  }),
});

module.exports = LikeTopDownType;

//==========type==============
const userType = require("./userType");
const newsTypw = require("./newsType");
