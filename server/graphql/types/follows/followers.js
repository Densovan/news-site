const graphql = require("graphql");
const User = require("../../../models/user");

const { GraphQLObjectType, GraphQLInt, GraphQLBoolean, GraphQLID } = graphql;

const followers = new GraphQLObjectType({
  name: "followersUser",
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

module.exports = followers;
const userType = require("../userType");
