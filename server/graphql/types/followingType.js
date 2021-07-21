const graphql = require("graphql");

//=============model=================
const User = require("../../models/user");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const FollowingType = new GraphQLObjectType({
  name: "following",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    followingId: { type: GraphQLID },
    followerId: { type: GraphQLID },
    message: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    user: {
      type: userType,
      resolve: (parent, args) => {
        return User.findById(parent.userId);
      },
    },
  }),
});

module.exports = FollowingType;
//==========type==============
const userType = require("./userType");
