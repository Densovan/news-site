const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = graphql;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//================type===============
const NewsType = require("../types/newsType");
//===============model===============
const NewsModel = require("../../models/news");
const UserModel = require("../../models/user");
const userType = require("../types/userType");

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
  },
});
module.exports = RootMutation;
