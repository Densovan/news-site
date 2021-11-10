const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
} = require("graphql");

const User = require("../../models/user");
const objectNotification = new GraphQLObjectType({
  name: "objectNotification",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    read: { type: GraphQLBoolean },
    hide: { type: GraphQLBoolean },
    count: { type: GraphQLInt },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findOne({ accountId: parents.userId });
      },
    },
  }),
});

module.exports = objectNotification;
const userType = require("./userType");
