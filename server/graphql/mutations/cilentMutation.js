const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
} = graphql;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//================type===============
const NewsType = require("../types/newsType");
const userType = require("../types/userType");
const followType = require("../types/followType");
//===============model===============
const NewsModel = require("../../models/news");
const UserModel = require("../../models/user");
const FollowModel = require("../../models/follow");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    //============add category=============
    add_news: {
      type: NewsType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        des: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLID) },
        type: { type: new GraphQLNonNull(GraphQLID) },
        thumnail: { type: new GraphQLNonNull(GraphQLString) },
        slug: { type: GraphQLString },
      },
      resolve: async (parents, args, context) => {
        try {
          const news = new NewsModel({
            ...args,
            createBy: context.id,
            slug: args.title.replace(/\s+/g, "-").toLowerCase(),
          });
          await news.save();
          return {
            message: "Add News Successful",
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    delete_news: {
      type: NewsType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args, context) => {
        try {
          await NewsModel.deleteOne({ _id: args.id, createBy: context.id });
          return { message: "Delete Successfull" };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    edit_news: {
      type: NewsType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        des: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLID) },
        type: { type: new GraphQLNonNull(GraphQLID) },
        thumnail: { type: new GraphQLNonNull(GraphQLString) },
        slug: { type: GraphQLString },
      },
      resolve: async (parents, args, context) => {
        try {
          await NewsModel.findByIdAndUpdate(
            { _id: args.id },
            { slug: args.title.replace(/\s+/g, "-").toLowerCase(), ...args },
            { createBy: context.id }
          );
          return {
            message: "update successfull",
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    update_user: {
      type: userType,
      args: {
        // id:{type:GraphQLID},
        fullname: { type: GraphQLString },
        passwordHash: { type: GraphQLString },
        confirmPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString },
        email: { type: GraphQLString },
        image: { type: GraphQLString },
      },
      resolve: async (root, args, context) => {
        const { email, passwordHash, newPassword, confirmPassword } = args;
        try {
          const user = await UserModel.findOne({ email });
          if (passwordHash) {
            const isPassword = await bcrypt.compare(
              passwordHash,
              user.passwordHash
            );
            if (isPassword) {
              if (newPassword === confirmPassword) {
                const saltRounds = 10;
                const hashPassword = await bcrypt.hash(newPassword, saltRounds);
                await UserModel.findByIdAndUpdate(
                  { _id: context.id },
                  { ...args, passwordHash: hashPassword }
                );
                return {
                  message: "The user info updated with successfully.",
                };
              }
              return {
                message: "The password does not match!",
              };
            }
            return {
              message: "The password is invalid!",
            };
          } else {
            await UserModel.findByIdAndUpdate(
              { _id: context.id },
              { ...args, passwordHash: user.passwordHash }
            );
            return {
              message: "The user info update with successfully.",
            };
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    //==========Follow Section==============
    // follow: {
    //   type: followType,
    //   args: {
    //     followTo: { type: GraphQLNonNull(GraphQLID) },
    //     follow: { type: GraphQLBoolean },
    //   },
    //   resolve: async (parent, args, context) => {
    //     const ExistFollowTo = await FollowModel.findOne({
    //       followTo: args.followTo,
    //       followBy: context.id,
    //     });
    //     try {
    //       if (ExistFollowTo) {
    //         await FollowModel.findOneAndUpdate({
    //           followTo: args.followTo,
    //           follow: true,
    //           followBy: context.id,
    //         });
    //         return {
    //           message: "Followed",
    //         };
    //       } else {
    //         const follow = new FollowModel({
    //           ...args,
    //           follow: true,
    //           createBy: context.id,
    //           followBy: context.id,
    //         });
    //         await follow.save();
    //         return {
    //           message: "Followed",
    //         };
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       throw error;
    //     }
    //   },
    // },
    // unfollow: {
    //   type: followType,
    //   args: {
    //     id: { type: GraphQLNonNull(GraphQLID) },
    //     follow: { type: GraphQLBoolean },
    //     // followBy: { type: GraphQLNonNull(GraphQLID) },
    //   },
    //   resolve: async (parent, args, context) => {
    //     try {
    //       await FollowModel.findOneAndUpdate({
    //         followTo: args.id,
    //         follow: false,
    //         followBy: context.id,
    //       });
    //       return { message: "Unfollowed" };
    //     } catch (error) {
    //       console.log(error);
    //       throw error;
    //     }
    //   },
    // },

    // follow_user: {
    //   type: userType,
    //   args: {
    //     id: { type: GraphQLID },
    //     following: { type: GraphQLID },
    //     follower: { type: GraphQLID },
    //   },
    //   resolve: async (parent, args, context) => {
    //     try {
    //       await UserModel.findByIdAndUpdate(
    //         {
    //           _id: args.id,
    //         },
    //         { $push: { follower: context.id } }
    //       );
    //       await UserModel.findByIdAndUpdate(
    //         { _id: context.id },
    //         { $push: { following: args.id } }
    //       );
    //       return { message: "successful" };
    //     } catch (error) {
    // console.log(error);
    // throw error;
    //     }
    //   },
    // },

    follow_user: {
      type: userType,
      args: {
        id: { type: GraphQLID },
        followerId: { type: GraphQLID },
        fullname: { type: GraphQLString },
        email: { type: GraphQLString },
        image: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        try {
          await UserModel.findByIdAndUpdate(
            {
              _id: args.id,
            },
            {
              $push: {
                follower: {
                  followerId: context.id,
                  fullname: context.fullname,
                  image: context.image,
                  email: context.email,
                },
              },
            }
          );
          await UserModel.findByIdAndUpdate(
            {
              _id: context.id,
            },
            {
              $push: {
                following: { ...args, followingId: args.id },
              },
            }
          );
          return { message: "successful" };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    unfollower_user: {
      type: userType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          await UserModel.findOneAndUpdate(
            { _id: args.id },
            {
              $pull: {
                follower: { followerId: context.id },
              },
            }
          );
          await UserModel.findOneAndUpdate(
            { _id: context.id },
            {
              $pull: {
                following: { followingId: args.id },
              },
            }
          );
          return { message: "successful" };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
  },
});
module.exports = RootMutation;
