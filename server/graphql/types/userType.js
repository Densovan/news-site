const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList } =
  graphql;
const News = require("../../models/news");

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    message: { type: GraphQLString },
    role: { type: GraphQLString },
    image: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
    news: {
      type: GraphQLList(newsType),
      resolve: (parent, args) => {
        return News.find({ createBy: parent.id });
      },
    },
  }),
});

module.exports = userType;

const newsType = require("./newsType");
