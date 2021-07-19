const graphql = require("graphql");

//=============model=================
const User = require("../../models/user");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const FollowType = new GraphQLObjectType({
  name: "follow",
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

module.exports = FollowType;
//==========type==============
const userType = require("./userType");
