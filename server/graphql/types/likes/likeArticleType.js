const graphql = require("graphql");

//=============model=================
const User = require("../../../models/user");
const News = require("../../../models/news");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;

const LikeType = new GraphQLObjectType({
  name: "liker",
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

module.exports = LikeType;

//==========type==============
const userType = require("../userType");
const newsTypw = require("../newsType");
