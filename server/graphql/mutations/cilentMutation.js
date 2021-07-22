const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
} = graphql;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//================type===============
const NewsType = require("../types/newsType");
const userType = require("../types/userType");
const questionType = require("../types/comment/questionType");
const answerType = require("../types/comment/answerType");
const likeType = require("../types/likeType");
const NotificationType = require("../types/notificationType");
const followType = require("../types/followType");
const notiType = require("../types/notiType");
const noticheckType = require("../types/notiCheckType");

//===============model===============
const NewsModel = require("../../models/news");
const UserModel = require("../../models/user");
const QuestionModel = require("../../models/comment/question");
const AnswerModel = require("../../models/comment/answer");
const LikeModel = require("../../models/like");
const NotificationModel = require("../../models/notification");
const { findOne } = require("../../models/user");
const FollowModel = require("../../models/follow");
const NotiModel = require("../../models/notifications");
const NoticheckModel = require("../../models/notiCheck");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    //============add Posts============
    // add_news: {
    //   type: NewsType,
    //   args: {
    //     title: { type: new GraphQLNonNull(GraphQLString) },
    //     des: { type: new GraphQLNonNull(GraphQLString) },
    //     category: { type: new GraphQLNonNull(GraphQLID) },
    //     type: { type: new GraphQLNonNull(GraphQLID) },
    //     thumnail: { type: new GraphQLNonNull(GraphQLString) },
    //     slug: { type: GraphQLString },
    //   },
    //   resolve: async (parents, args, context) => {
    //     try {
    //       const existingSlug = await NewsModel.findOne({ title: args.title });
    //       const existingFollower = await FollowModel.findOne({
    //         followTo: context.id,
    //       });
    //       // const followBy = existingFollower.map((res) => res.followBy);
    //       // const followTo1 = followTo.fineOne({})
    //       // console.log("followTo", followBy);
    //       // console.log("context", context.id);
    //       if (existingSlug) {
    //         return { message: "This Title already exist!", status: 400 };
    //       } else {
    //         if (existingFollower.followTo === context.id) {
    //           const noti = new NotiModel({
    //             // ownerId: followBy,
    //             type: "new",
    //             userId: context.id,
    //             followTo: context.id,
    //           });
    //           await noti.save();
    //           const news = new NewsModel({
    //             ...args,
    //             createBy: context.id,
    //             slug: args.title
    //               .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, "-")
    //               .toLowerCase(),
    //             // slug: args.title.replace(/\s+/g, "-").toLowerCase(),
    //           });
    //           await news.save();
    //           return {
    //             message: "Created Successfully",
    //             status: 200,
    //           };
    //         } else {
    //           const news = new NewsModel({
    //             ...args,
    //             createBy: context.id,
    //             slug: args.title
    //               .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, "-")
    //               .toLowerCase(),
    //             // slug: args.title.replace(/\s+/g, "-").toLowerCase(),
    //           });
    //           await news.save();
    //           return {
    //             message: "Created",
    //             status: 200,
    //           };
    //         }
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       throw error;
    //     }
    //   },
    // },

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
        ownerId: {
          type: GraphQLID,
        },
      },
      resolve: async (parent, args, context) => {
        try {
          const question = new QuestionModel({
            ...args,
            userId: context.id,
            ownerId: args.ownerId,
          });
          await question.save();
          if (context.id === args.ownerId) {
            return { message: "nothing happen" };
          } else {
            const noti = new NotiModel({
              userId: context.id,
              postId: args.postId,
              ownerId: args.ownerId,
              type: "comment",
            });
            await noti.save();
          }
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
            // await NotiModel.findOneAndDelete({ userId: context.id });
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

    delete_comment_in_noti: {
      type: notiType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          const existingUser = await NotiModel.findOne({
            _id: args.id,
          });
          // console.log(existingUser.userId);
          if (existingUser.userId === context.id) {
            await NotiModel.findByIdAndDelete({ _id: args.id });
            return { message: "successfully" };
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
        ownerId: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          const answer = new AnswerModel({
            ...args,
            userId: context.id,
            ownerId: args.ownerId,
          });
          await answer.save();
          if (context.id === args.ownerId) {
            return { message: "nothing happen" };
          } else {
            const noti = new NotiModel({
              userId: context.id,
              postId: args.postId,
              type: "reply",
              ownerId: args.ownerId,
              questionId: args.questionId,
            });
            await noti.save();
          }
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

    delete_reply_in_noti: {
      type: notiType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          const existingUser = await NotiModel.findOne({
            _id: args.id,
          });
          if (existingUser.userId === context.id) {
            await NotiModel.findByIdAndDelete({ _id: args.id });
            return { message: "Successfully" };
          } else {
            return { message: "sorry someting wrong" };
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
        ownerId: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          // console.log(args.postId);
          const existingLike = await LikeModel.findOne({
            userId: context.id,
            postId: args.postId,
          });
          // console.log("dataLike", existingLike);
          if (!existingLike) {
            const like = new LikeModel({
              ...args,
              ownerId: args.ownerId,
              userId: context.id,
              count: 1,
            });
            await like.save();
            if (context.id === args.ownerId) {
              return { message: "nothing happen" };
            } else {
              const noti = new NotiModel({
                ...args,
                type: "like",
                ownerId: args.ownerId,
                userId: context.id,
              });
              await noti.save();
            }
            return { message: "successful" };
          }
          // console.log("postID", args.postId);
          // console.log("userId", context.id);
          if (
            context.id === existingLike.userId &&
            args.postId === existingLike.postId
          ) {
            // console.log("userId", context.id);
            await LikeModel.findOneAndDelete({
              userId: context.id,
              postId: args.postId,
            });
            await NotiModel.findOneAndDelete({
              userId: context.id,
              postId: args.postId,
              type: "like",
            });
            return { message: "delete successful" };
          } else {
            // console.log("userId", context.id);
            const like = new LikeModel({
              ...args,
              ownerId: args.ownerId,
              userId: context.id,
              count: 1,
            });
            await like.save();
            const noti = new NotiModel({
              ...args,
              type: "like",
              userId: context.id,
            });
            await noti.save();
            return { message: "successful" };
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    // =============== notification ===============
    notification: {
      type: NotificationType,
      args: {
        postId: { type: GraphQLID },
      },
      resolve: async (parents, args, context) => {
        try {
          const existingUser = await NotificationModel.findOne({
            userId: context.id,
          });
          if (!existingUser) {
            const notification = new NotificationModel({
              ...args,
              userId: context.id,
              postId: args.postId,
            });
            await notification.save();
            return {
              message: "success",
            };
          } else if (context.id === existingUser.userId) {
            await NotificationModel.findOneAndUpdate(
              {
                userId: context.id,
              },
              {
                $push: {
                  postId: args.postId,
                },
              }
            );
            return {
              message: "success 2",
            };
          } else {
            console.log("hello3");
          }
        } catch {
          console.log(error);
          throw error;
        }
      },
    },
    // follow: {
    //   type: followType,
    //   args: {
    //     followTo: { type: GraphQLNonNull(GraphQLID) },
    //     followBy: { type: GraphQLID },
    //     userId: { type: GraphQLID },
    //   },
    //   resolve: async (parent, args, context) => {
    //     try {
    //       const existingFollow = await FollowModel.findOne({
    //         followingId: args.followingId,
    //         followerId: context.id,
    //         userId: context.id,
    //       });
    //       if (!existingFollow) {
    //         const follow = new FollowModel({
    //           followingId: args.followingId,
    //           followerId: context.id,
    //           userId: context.id,
    //         });
    //         await follow.save();
    //         return { message: "Follow Successfully" };
    //       }
    //       if (
    //         context.id === existingFollow.followerId &&
    //         context.id === existingFollow.userId &&
    //         args.followingId === existingFollow.followingId
    //       ) {
    //         await FollowModel.findOneAndDelete({
    //           userId: context.id,
    //           followingId: args.followingId,
    //           followerId: context.id,
    //         });
    //         return { message: "Unfollow Successfully" };
    //       } else {
    //         const follow = new FollowModel({
    //           followingId: args.followingId,
    //           followerId: context.id,
    //           userId: context.id,
    //         });
    //         await follow.save();
    //         return { message: "Follow Successfully" };
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       throw error;
    //     }
    //   },
    // },

    follow: {
      type: followType,
      args: {
        followTo: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args, context) => {
        const ExistFollowTo = await FollowModel.findOne({
          followTo: args.followTo,
          followBy: context.id,
        });
        try {
          if (ExistFollowTo) {
            await FollowModel.findOneAndDelete({
              followTo: args.followTo,
              // follow: true,
              followBy: context.id,
            });
            return {
              message: "Unfollowed",
            };
          } else {
            const follow = new FollowModel({
              ...args,
              // follow: true,
              createBy: context.id,
              followBy: context.id,
            });
            await follow.save();
            const noti = new NotiModel({
              ...args,
              type: "follow",
              ownerId: args.followTo,
              userId: context.id,
              followBy: context.id,
            });
            await noti.save();
            return {
              message: "Followed",
            };
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    //===============set to notificationcheck================
    notification_check: {
      type: notiType,
      args: {
        ownerId: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          await NotiModel.find({
            ownerId: context.id,
          }).then((doc) => {
            // console.log(doc);
            //insert the doc to notificationcheck model
            NoticheckModel.insertMany(doc)
              .then((msg) => {
                // console.log("Save successfully");
                return { message: "Save Successfully" };
              })
              .catch((error) => {
                console.log(error);
              });
            //Remove the doc from notification model
            NotiModel.deleteMany({ ownerId: args.ownerId })
              .then((msg) => {
                // console.log("Remove successfull");
                return { message: "Remove Successfully" };
              })
              .catch((error) => {
                console.log(error);
              });
          });
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
  },
});
module.exports = RootMutation;
