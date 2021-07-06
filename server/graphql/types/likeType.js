const graphql = require("graphql");

//=============model=================
const User = require("../../models/user");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const LikeType = new GraphQLObjectType({
  name: "like",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    createdAt: {
      type: GraphQLString,
    },
    postId: {
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
  }),
});

module.exports = LikeType;

//==========type==============
const userType = require("./userType");
