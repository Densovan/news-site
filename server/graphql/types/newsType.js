const graphql = require("graphql");

//=============model=============
const Category = require("../../models/category");
const Type = require("../../models/type");
const User = require("../../models/user");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const NewsType = new GraphQLObjectType({
  name: "news",
  fields: () => ({
    title: { type: GraphQLString },
    des: { type: GraphQLString },
    category: { type: GraphQLString },
    thumnail: { type: GraphQLString },
    type: { type: GraphQLString },
    message: { type: GraphQLString },
    createBy: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    updateAt: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
    categories: {
      type: categoryType,
      resolve: (parents, args) => {
        return Category.findById(parents.category);
      },
    },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.createBy);
      },
    },
    types: {
      type: type,
      resolve: (parents, args) => {
        return Type.findById(parents.type);
      },
    },
  }),
});

module.exports = NewsType;

//=============type===========
const categoryType = require("./categoryType");
const type = require("./type");
const userType = require("./userType");
