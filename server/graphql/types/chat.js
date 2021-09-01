const graphql = require("graphql");

// const Chat = require("../../models/chat");
const User = require("../../models/user");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;

const ChatType = new GraphQLObjectType({
  name: "chat",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    body: { type: GraphQLString },
    message: { type: GraphQLString },
    // chat: { type: GraphQLString },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.userId);
      },
    },
  }),
});

module.exports = ChatType;

//==========type==============
const userType = require("./userType");
