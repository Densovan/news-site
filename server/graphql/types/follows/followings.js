const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
} = require("graphql");
const User = require("../../../models/user");

// const { GraphQLObjectType, GraphQLID } = graphql;

const followings = new GraphQLObjectType({
  name: "followingUser",
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: GraphQLID },
    users: {
      type: userType,
      resolve: (parent, args) => {
        return User.findOne({ accountId: parent.user });
      },
    },
  }),
});

module.exports = followings;
const userType = require("../userType");
