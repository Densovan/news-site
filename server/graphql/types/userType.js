const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} = graphql;
const News = require("../../models/news");
const Follow = require("../../models/follow");
// const Following = require("../../models/following");

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    passwordHash: { type: GraphQLString },
    token: { type: GraphQLString },
    message: { type: GraphQLString },
    bio: { type: GraphQLString },
    gender: { type: GraphQLString },
    follow: { type: GraphQLString },
    role: { type: GraphQLString },
    image: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    ban: { type: GraphQLBoolean },
    id: {
      type: GraphQLID,
    },
    news: {
      type: GraphQLList(newsType),
      resolve: (parent, args) => {
        return News.find({ createBy: parent.id });
      },
    },
    following: {
      type: GraphQLList(followType),
      resolve: (parent, args) => {
        return Follow.find({ followBy: parent.id });
      },
    },
    follower: {
      type: GraphQLList(followType),
      resolve: (parent, args) => {
        return Follow.find({ followTo: parent.id });
      },
    },
  }),
});

module.exports = userType;

const newsType = require("./newsType");
const followType = require("./followType");
// const followingType = require("./followingType");
