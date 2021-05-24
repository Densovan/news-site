const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//=============model============
const News = require("../../models/news");
const User = require("../../models/user");

const CategoryType = new GraphQLObjectType({
  name: "category",
  fields: () => ({
    name: { type: GraphQLString },
    createBy: { type: GraphQLString },
    createAt: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
    message: {
      type: GraphQLString,
    },
    user: {
      type: userType,
      resolve: (parents, args) => {
        return User.findById(parents.createBy);
      },
    },
    news: {
      type: GraphQLList(newsType),
      resolve: (parent, args) => {
        return News.find({ category: parent.id });
      },
    },
  }),
});
module.exports = CategoryType;

//=============type====================
const newsType = require("./newsType");
const userType = require("./userType");
