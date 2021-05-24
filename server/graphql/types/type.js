const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//=============model============
const News = require("../../models/news");
const User = require("../../models/user");

const Type = new GraphQLObjectType({
  name: "type",
  fields: () => ({
    name: { type: GraphQLString },
    createBy: { type: GraphQLString },
    message: { type: GraphQLString },
    createAt: {
      type: GraphQLString,
    },
    news: {
      type: GraphQLList(newsType),
      resolve: (parent, args) => {
        return News.find({ type: parent.id });
      },
    },
  }),
});
module.exports = Type;

//=============type====================
const newsType = require("./newsType");
const userType = require("./userType");
