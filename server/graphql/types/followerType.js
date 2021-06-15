const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const FollowingModel = require("../../models/following");
const User = require("../../models/user");

const Follower = new GraphQLObjectType({
  name: "follower",
  fields: () => ({
    followerBy: { type: GraphQLString },
    followerCount: { type: GraphQLString },
    id: { type: GraphQLID },
    createBy: { type: GraphQLString },
    message: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.createBy);
      },
    },
  }),
});
module.exports = Follower;

const userType = require("../types/userType");
