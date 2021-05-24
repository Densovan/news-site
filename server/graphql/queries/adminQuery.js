const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;

//=================Modal Sections===============
const User = require("../../models/user");
//================Type Sections==================
const UserType = require("../types/userType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //=============get users===============
    get_users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({}).sort({ createAt: -1 });
      },
    },
    get_user: {
      type: UserType,
      resolve(parent, args, context) {
        return User.findById(context.id);
      },
    },
  },
});

module.exports = RootQuery;
