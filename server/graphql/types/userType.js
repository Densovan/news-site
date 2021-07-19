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
const User = require("../../models/user");
const Follow = require("../../models/follow");

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
    followerId: { type: GraphQLID },
    followingId: { type: GraphQLID },
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
      type: GraphQLList(usersType),
    },
    follower: { type: GraphQLList(usersType) },

    get_following: {
      type: GraphQLList(followType),
      resolve: (parent, args) => {
        return Follow.find({ followBy: parent.id });
      },
    },
    get_follower: {
      type: GraphQLList(followType),
      resolve: (parent, args) => {
        return Follow.find({ followTo: parent.id });
      },
    },

    // following_user: {
    //   type: GraphQLList(followType),
    //   resolve: (parent, args) => {
    //     return Follow.find({ followingId: parent.id });
    //   },
    // },
    // follower_user: {
    //   type: GraphQLList(followType),
    //   resolve: (parent, args) => {
    //     return Follow.find({ followerId: parent.id });
    //   },
    // },
  }),
});

module.exports = userType;

const newsType = require("./newsType");
const usersType = require("./userType");
const followType = require("./followType");
