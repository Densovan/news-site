const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const FollowingModel = require("../../models/following");
const User = require("../../models/user");

const Following = new GraphQLObjectType({
  name: "following",
  fields: () => ({
    followingWho: { type: GraphQLString },
    followingCount: { type: GraphQLString },
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
module.exports = Following;

const userType = require("../types/userType");
