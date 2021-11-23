// const graphql = require("graphql");

// const {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLInt,
//   GraphQLID,
//   GraphQLList,
//   GraphQLBoolean,
// } = graphql;
// const News = require("../../models/news");
// const User = require("../../models/user");
// const Follow = require("../../models/follow");

// const userType = new GraphQLObjectType({
//   name: "user",
//   fields: () => ({
//     fullname: { type: GraphQLString },
//     email: { type: GraphQLString },
//     passwordHash: { type: GraphQLString },
//     token: { type: GraphQLString },
//     message: { type: GraphQLString },
//     bio: { type: GraphQLString },
//     gender: { type: GraphQLString },
//     follow: { type: GraphQLString },
//     role: { type: GraphQLString },
//     followerId: { type: GraphQLID },
//     followingId: { type: GraphQLID },
//     image: { type: GraphQLString },
//     createdAt: {
//       type: GraphQLString,
//     },
//     ban: { type: GraphQLBoolean },
//     id: {
//       type: GraphQLID,
//     },
//     news: {
//       type: GraphQLList(newsType),
//       resolve: (parent, args) => {
//         return News.find({ createBy: parent.id });
//       },
//     },
//     following: {
//       type: GraphQLList(usersType),
//     },
//     follower: { type: GraphQLList(usersType) },

//     get_following: {
//       type: GraphQLList(followType),
//       resolve: (parent, args) => {
//         return Follow.find({ followBy: parent.id });
//       },
//     },
//     get_follower: {
//       type: GraphQLList(followType),
//       resolve: (parent, args) => {
//         return Follow.find({ followTo: parent.id });
//       },
//     },
//   }),
// });

// module.exports = userType;

// const newsType = require("./newsType");
// const usersType = require("./userType");
// const followType = require("./followType");

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
    accountId: { type: GraphQLID },
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
    userId: {
      type: GraphQLID,
    },
    // followings: {
    //   type: GraphQLList(followingsType),
    // },
    // followers: { type: GraphQLList(followersType) },

    following: {
      type: GraphQLList(userType),
    },
    follower: { type: GraphQLList(userType) },

    get_following: {
      type: GraphQLList(followType),
      resolve: (parent, args) => {
        // return Follow.find({ followBy: parent.id });
        return Follow.find({ followBy: parent.accountId });
      },
    },
    get_follower: {
      type: GraphQLList(followType),
      resolve: (parent, args) => {
        // return Follow.find({ followTo: parent.id });
        return Follow.find({ followTo: parent.accountId });
      },
    },

    followers: {
      type: new GraphQLList(followers),
    },
    followings: {
      type: new GraphQLList(followings),
    },
  }),
});

module.exports = userType;

const followingsType = require("./followingsType");
const followersType = require("./followersType");
const newsType = require("./newsType");
const usersType = require("./userType");
const followType = require("./followType");
const followers = require("./follows/followers");
const followings = require("./follows/followings");
