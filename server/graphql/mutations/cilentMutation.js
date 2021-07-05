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
const questionType = require("../types/comment/questionType");
const answerType = require("../types/comment/answerType");
const likeType = require("../types/likeType");

//===============model===============
const NewsModel = require("../../models/news");
const UserModel = require("../../models/user");
const QuestionModel = require("../../models/comment/question");
const AnswerModel = require("../../models/comment/answer");
const LikeModel = require("../../models/like");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    //============add Posts============
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
          const existingSlug = await NewsModel.findOne({ title: args.title });
          if (existingSlug) {
            return { message: "This Title already exist!", status: 400 };
          } else {
            const news = new NewsModel({
              ...args,
              createBy: context.id,
              slug: args.title
                .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, "-")
                .toLowerCase(),
              // slug: args.title.replace(/\s+/g, "-").toLowerCase(),
            });
            await news.save();
            return {
              message: "Created Successfully",
              status: 200,
            };
          }
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
            // { slug: args.title.replace(/\s+/g, "-").toLowerCase(), ...args },
            {
              slug: args.title
                .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, "-")
                .toLowerCase(),
              ...args,
            },
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
        bio: { type: GraphQLString },
        gender: { type: GraphQLString },
        ban: { type: GraphQLBoolean },
      },
      resolve: async (root, args, context) => {
        const {
          email,
          passwordHash,
          newPassword,
          confirmPassword,
          fullname,
          bio,
          gender,
          ban,
          image,
        } = args;
        try {
          const user = await UserModel.findOne({ email });
          if (passwordHash) {
            const isPassword = await bcrypt.compare(
              passwordHash,
              user.passwordHash
            );
            if (isPassword) {
              if (newPassword === confirmPassword) {
                const saltRounds = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(newPassword, saltRounds);
                await UserModel.findByIdAndUpdate(
                  { _id: context.id },
                  { ...args, passwordHash: hashPassword }
                );
                return {
                  message: "Your info updated with successfully.",
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
              {
                ...args,
                passwordHash: user.passwordHash,
              }
            );
            return {
              message: "Your info update with successfully.",
            };
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    //==========Follow Section==============

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
    //===========comment section=====================
    comment: {
      type: questionType,
      args: {
        userId: { type: GraphQLID },
        postId: { type: GraphQLID },
        question: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        try {
          const question = new QuestionModel({
            ...args,
            userId: context.id,
          });
          await question.save();
          return { message: "successful" };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    edit_comment: {
      type: questionType,
      args: {
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        postId: { type: GraphQLID },
        question: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        try {
          const existingUser = await QuestionModel.findOne({ _id: args.id });
          if (existingUser.userId === context.id) {
            await QuestionModel.findByIdAndUpdate(
              { _id: args.id },
              { ...args, userId: context.id }
            );
            return { message: "successful" };
          } else {
            return { message: "sorry something wrong" };
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    delete_comment: {
      type: questionType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          const existingUser = await QuestionModel.findOne({ _id: args.id });
          if (existingUser.userId === context.id) {
            await QuestionModel.findByIdAndDelete({ _id: args.id });
            await AnswerModel.findOneAndDelete({ questionId: args.id });
            return { message: "Successful" };
          } else {
            return { message: "sorry something wrong" };
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    reply: {
      type: answerType,
      args: {
        userId: { type: GraphQLID },
        postId: { type: GraphQLID },
        answer: { type: GraphQLString },
        questionId: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          const answer = new AnswerModel({
            ...args,
            userId: context.id,
          });
          await answer.save();
          return { message: "successful" };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    edit_reply: {
      type: answerType,
      args: {
        id: { type: GraphQLID },
        answer: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          const existingUser = await AnswerModel.findOne({ _id: args.id });
          if (existingUser.userId === context.id) {
            await AnswerModel.findByIdAndUpdate(
              { _id: args.id },
              { ...args, userId: context.id }
            );
            return { message: "successful" };
          } else {
            return { message: "sorry something wrong" };
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    delete_reply: {
      type: answerType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          const existingUser = await AnswerModel.findOne({ _id: args.id });
          if (existingUser.userId === context.id) {
            await AnswerModel.findByIdAndDelete({ _id: args.id });
            return { message: "successful" };
          } else {
            return { message: "sorry something wrong" };
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    //================Like post section===================
    like: {
      type: likeType,
      args: {
        postId: { type: GraphQLNonNull(GraphQLID) },
        // userId: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          console.log(args.postId);
          const existingLike = await LikeModel.findOne({
            userId: context.id,
            postId: args.postId,
          });
          console.log("dataLike", existingLike);
          if (!existingLike) {
            const like = new LikeModel({
              ...args,
              userId: context.id,
            });
            await like.save();
            return { message: "successful" };
          }
          console.log("postID", args.postId);
          console.log("userId", context.id);
          if (
            context.id === existingLike.userId &&
            args.postId === existingLike.postId
          ) {
            console.log("userId", context.id);
            await LikeModel.findOneAndDelete({
              userId: context.id,
              postId: args.postId,
            });
            return { message: "delete successful" };
          } else {
            console.log("userId", context.id);
            const like = new LikeModel({
              ...args,
              userId: context.id,
            });
            await like.save();
            return { message: "successful" };
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
