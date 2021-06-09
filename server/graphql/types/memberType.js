const graphql = require("graphql");

//===============model================
const User = require("../../models/user");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const MemberType = new GraphQLObjectType({
  name: "member",
  fields: () => ({
    name: { type: GraphQLString },
    position: { type: GraphQLString },
    createBy: { type: GraphQLID },
    message: { type: GraphQLString },
    image: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    updateAt: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.createBy);
      },
    },
  }),
});

module.exports = MemberType;

//=============type===========
const userType = require("./userType");
