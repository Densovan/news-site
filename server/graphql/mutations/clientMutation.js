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
const saveNews = require("../types/saveNewsType");
const likeTopDownType = require("../types/likeTopDownType");
const voteType = require("../types/voteType");
const chattype = require("../types/chat");
const NewsNotificationType = require("../types/newsNotificationType");
const ConversationNotificationType = require("../types/conversationNotificationType");
const VoteNotificationType = require("../types/voteNotificationType");
//===============model===============
const NewsModel = require("../../models/news");
const UserModel = require("../../models/user");
const QuestionModel = require("../../models/comment/question");
const AnswerModel = require("../../models/comment/answer");
const LikeModel = require("../../models/like");
const NotificationModel = require("../../models/notification");
const FollowModel = require("../../models/follow");
// const NotiModel = require("../../models/notifications");
const NoticheckModel = require("../../models/notiCheck");
const SaveNewsModel = require("../../models/saveNews");
const LikeTopDownModel = require("../../models/likeTopDown");
const VoteModel = require("../../models/vote");
const SaveNewsType = require("../types/saveNewsType");
const Chat = require("../../models/chat");
const NewsNotificationModel = require("../../models/newsNotification");
const ConversationNotificationModel = require("../../models/conversationNotification");
const VoteNotificationModel = require("../../models/voteNotification");
const { pubsub } = require("../../subscription");
const { default: axios } = require("axios");
const QuestionType = require("../types/comment/questionType");

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
          const userFollower = await FollowModel.find({ followTo: context.id });
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
            await news.save().then((response) => {
              let followers = [];
              userFollower.map((follower) => {
                followers.push({
                  userId: follower.followBy,
                  read: true,
                  hide: true,
                  count: 1,
                });
              });
              const NewsNotification = NewsNotificationModel({
                userId: context.id,
                postId: response.id,
                type: "news",
                notifications: followers,
              });
              try {
                NewsNotification.save();
              } catch (error) {
                throw error;
              }
            });
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
          const existingSlug = await NewsModel.findOne({ title: args.title });
          if (existingSlug) {
            return { message: "This Title already exist!", status: 400 };
          } else {
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
              message: "Update successfully",
              status: 200,
            };
          }
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
        accountId: { type: GraphQLID },
      },
      resolve: async (root, args, context) => {
        const {
          email,
          passwordHash,
          newPassword,
          confirmPassword,
          accountId,
          fullname,
          bio,
          gender,
          ban,
          image,
        } = args;
        try {
          const user = await UserModel.findOne({ email });
          // if (passwordHash) {
          //   const isPassword = await bcrypt.compare(
          //     passwordHash,
          //     user.passwordHash
          //   );
          //   if (isPassword) {
          //     if (newPassword === confirmPassword) {
          //       const saltRounds = await bcrypt.genSalt(10);
          //       const hashPassword = await bcrypt.hash(newPassword, saltRounds);
          //       await UserModel.findOneAndUpdate(
          //         { accountId: context.id },
          //         { ...args, passwordHash: hashPassword }
          //       );
          //       return {
          //         message: "Your info updated with successfully.",
          //       };
          //     }
          //     return {
          //       message: "The password does not match!",
          //     };
          //   }
          //   return {
          //     message: "The password is invalid!",
          //   };
          // } else {
          await UserModel.findOneAndUpdate(
            { accountId: context.id },
            {
              ...args,
              // passwordHash: user.passwordHash,
            }
          );
          return {
            message: "Your info update with successfully.",
          };
          // }
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
            type: "comment",
            notifications: [
              { userId: args.ownerId, read: true, hide: true, count: 1 },
            ],
          });
          await question.save().then(async (response) => {
            if (context.id === args.ownerId) {
              return { message: "nothing happen" };
            } else {
              const NotificationQuestion = NotificationModel({
                userId: context.id,
                ownerId: args.ownerId,
                relateId: response.id,
                type: "comment",
              });
              await NotificationQuestion.save();
            }
          });
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
            const answers = await AnswerModel.find({
              questionId: args.id,
              type: "reply",
            });

            answers.forEach(async (element) => {
              await NotificationModel.findOneAndDelete({
                relateId: element._id,
              });
              await AnswerModel.findByIdAndDelete({ _id: element._id });
            });
            await NotificationModel.findOneAndDelete({
              relateId: args.id,
              type: "comment",
            });
            await QuestionModel.findByIdAndDelete({ _id: args.id });

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
      type: noticheckType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          const existingUser = await NoticheckModel.findOne({
            _id: args.id,
          });
          if (existingUser.ownerId === context.id) {
            await NoticheckModel.findByIdAndDelete({ _id: args.id });
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
        userIdTo: { type: GraphQLID },
        ownerId: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          const answer = new AnswerModel({
            ...args,
            userId: context.id,
            ownerId: args.ownerId,
            answer: args.answer,
            type: "reply",
            notifications: [
              { userId: context.id, read: true, hide: true, count: 1 },
              { userId: args.userIdTo, read: true, hide: true, count: 1 },
            ],
          });
          await answer.save().then(async (response) => {
            let Notification = await NotificationModel({
              userId: response.userIdTo,
              ownerId: args.ownerId,
              relateId: response._id,
              type: "reply",
            });
            await Notification.save();
          });

          // let conversation = await ConversationNotificationModel({
          //   userId: context.id,
          //   ownerId: args.ownerId,
          //   userId2: args.userIdTo,
          //   postId: args.postId,
          //   type: "reply",
          //   notifications: [{ userId: context.id, read: true, hire: true, count: 1 }, { userId: args.userIdTo, read: true, hire: true, count: 1 }]
          // });
          // await conversation.save();
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
            await NotificationModel.findOneAndDelete({ relateId: args.id });
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
      type: noticheckType,
      args: {
        id: { type: GraphQLID },
      },

      resolve: async (parent, args, context) => {
        try {
          const existingUser = await NoticheckModel.findOne({
            _id: args.id,
          });
          // console.log(existingUser.userId);
          if (existingUser.ownerId === context.id) {
            await NoticheckModel.findByIdAndDelete({ _id: args.id });
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

    delete_like_in_noti: {
      type: noticheckType,
      args: {
        id: { type: GraphQLID },
      },

      resolve: async (parent, args, context) => {
        try {
          const existingUser = await NoticheckModel.findOne({
            _id: args.id,
          });
          if (existingUser.ownerId === context.id) {
            await NoticheckModel.findByIdAndDelete({ _id: args.id });
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

    // =============== notification ===============
    // notification: {
    //   type: NotificationType,
    //   args: {
    //     postId: { type: GraphQLID },
    //   },
    //   resolve: async (parents, args, context) => {
    //     try {
    //       const existingUser = await NotificationModel.findOne({
    //         userId: context.id,
    //       });
    //       if (!existingUser) {
    //         const notification = new NotificationModel({
    //           ...args,
    //           userId: context.id,
    //           postId: args.postId,
    //         });
    //         await notification.save();
    //         return {
    //           message: "success",
    //         };
    //       } else if (context.id === existingUser.userId) {
    //         await NotificationModel.findOneAndUpdate(
    //           {
    //             userId: context.id,
    //           },
    //           {
    //             $push: {
    //               postId: args.postId,
    //             },
    //           }
    //         );
    //         return {
    //           message: "success 2",
    //         };
    //       } else {
    //         console.log("hello3");
    //       }
    //     } catch {
    //       console.log(error);
    //       throw error;
    //     }
    //   },
    // },
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
      NotificationType,
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
              followBy: context.id,
            });
            await NotificationModel.findOneAndDelete({
              relateId: args.followTo,
              userId: context.id,
              type: "follow",
            });
            return {
              message: "Unfollowed",
            };
          } else {
            const follow = new FollowModel({
              ...args,
              createBy: context.id,
              followBy: context.id,
              type: "follow",
              notifications: [
                { userId: args.followTo, read: true, hide: true, count: 1 },
              ],
            });
            await follow.save();
            let Notification = await NotificationModel({
              userId: context.id,
              ownerId: context.id,
              relateId: args.followTo,
              type: "follow",
            });
            await Notification.save();
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
    //============save news=================
    save_news: {
      type: saveNews,
      args: {
        news_id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        des: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLID) },
        createBy: { type: new GraphQLNonNull(GraphQLID) },
        type: { type: new GraphQLNonNull(GraphQLID) },
        thumnail: { type: new GraphQLNonNull(GraphQLString) },
        slug: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        try {
          const existingSave = await SaveNewsModel.findOne({
            userId: context.id,
            news_id: args.news_id,
          });
          if (!existingSave) {
            const save = new SaveNewsModel({
              ...args,
              userId: context.id,
            });
            await save.save();
            return { message: "Successfully" };
          }
          if (
            context.id === existingSave.userId &&
            args.news_id === existingSave.news_id
          ) {
            await SaveNewsModel.findOneAndDelete({
              userId: context.id,
              news_id: args.news_id,
            });
            return { message: "delete successful" };
          } else {
            const save = new SaveNewsModel({
              ...args,
              userId: context.id,
            });
            await save.save();
            return { message: "Successfully" };
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    delete_save_news: {
      type: SaveNewsType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          await SaveNewsModel.findByIdAndDelete({ _id: args.id });
          return { message: "Remove Sucessfully" };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    //==============like top down=============

    voteUpDown: {
      type: voteType,
      args: {
        postId: { type: GraphQLID },
        ownerId: { type: GraphQLID },
        type: { type: GraphQLString },
        count: { type: GraphQLInt },
      },
      resolve: async (parent, args, context) => {
        try {
          const existingVote = await VoteModel.findOne({
            userId: context.id,
            postId: args.postId,
          });
          // const news = await NewsModel.findById(args.postId);
          const checkUser = await NotificationModel.findOne({
            userId: context.id,
            relateId: args.postId,
            type: "vote",
            ownerId: context.id,
          });
          if (!existingVote) {
            if (checkUser === null) {
              let Notification = await NotificationModel({
                userId: context.id,
                ownerId: args.ownerId,
                relateId: args.postId,
                type: "vote",
              });
              await Notification.save();
            }
            if (args.type === "up") {
              const up = new VoteModel({
                ...args,
                userId: context.id,
                voteUp: 1,
                count: args.count,
                type: args.type,
                notifications: [
                  { userId: args.ownerId, read: true, hide: true, count: 1 },
                ],
              });
              await up.save();

              return { message: "add successfully" };
            } else if (args.type === "down") {
              const up = new VoteModel({
                ...args,
                userId: context.id,
                voteDown: 1,
                count: args.count,
                type: args.type,
                notifications: [
                  { userId: args.ownerId, read: true, hide: true, count: 1 },
                ],
              });
              await up.save();
              return { message: "add successfully" };
            }
          } else if (existingVote) {
            if (existingVote.voteDown === 1 && args.type === "down") {
              await VoteModel.findOneAndDelete({
                userId: context.id,
                postId: args.postId,
              });

              await NotificationModel.findOneAndDelete({
                userId: context.id,
                // ownerId: args.ownerId,
                relateId: args.postId,
                type: "vote",
              });

              return { message: "delete successfully" };
            } else if (existingVote.voteUp === 1 && args.type === "up") {
              await VoteModel.findOneAndDelete({
                userId: context.id,
                postId: args.postId,
              });
              await NotificationModel.findOneAndDelete({
                userId: context.id,
                // ownerId: args.ownerId,
                relateId: args.postId,
                type: "vote",
              });
              return { message: "delete successfully" };
            } else if (existingVote.voteUp === 0 && args.type === "up") {
              await VoteModel.findOneAndUpdate(
                { postId: args.postId, userId: context.id },
                { type: args.type, voteUp: 1, voteDown: 0, count: args.count }
              );

              return { message: "add successfully" };
            } else if (existingVote.voteDown === 0 && args.type === "down") {
              await VoteModel.findOneAndUpdate(
                { postId: args.postId, userId: context.id },
                { type: args.type, voteDown: 1, voteUp: 0, count: args.count }
              );
              return { message: "add successfully" };
            } else {
              console.log("hello");
              return { message: "nothing happend" };
            }
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    check_top_news: {
      type: NewsType,
      args: {
        postId: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        try {
          const vote = await VoteModel.find({}).sort({ createdAt: -1 });
          let sum = 0;
          let voteCount = [];
          for (let i = 0; i < vote.length; i++) {
            if (vote[i].postId === args.postId) {
              sum += vote[i].count;
            }
            voteCount.push(sum);
          }
          await NewsModel.findByIdAndUpdate(
            { _id: args.postId },
            {
              voteCount: sum,
            }
          );
          console.log(sum);
          return { message: "add successfully" };
        } catch (e) {
          return { message: "You have problem" };
        }
      },
    },

    //====================chat================

    chat: {
      type: chattype,
      args: {
        body: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        const chat = await Chat({
          userId: context.id,
          body: args.body,
        });
        await chat.save();
        pubsub.publish("newChat", { chat });
        // const chat = await response.json();
        console.log(chat);
        // pubsub.publish("chatmessage", { newChat: chat });
        return { message: "successfull" };
      },
    },

    //================= follow_notification_user ====================

    show_notifications: {
      type: NotificationType,
      resolve: async (parent, args, context) => {
        try {
          const notificationNews = await NotificationModel.find({
            type: "follow",
          });
          const notificationQuestion = await NotificationModel.find({
            type: "comment",
          });
          const notificationAnswer = await NotificationModel.find({
            type: "reply",
          });
          const notificationVote = await NotificationModel.find({
            type: "vote",
          });
          notificationNews.map(async (item) => {
            const news = await NewsNotificationModel.find({
              userId: item.relateId,
              type: "news",
            });
            const follower = await FollowModel.findOne({
              followTo: item.relateId,
            });
            const timeFollow = new Date(follower.createdAt).getTime();
            news.map(async (item1) => {
              const timeNews = new Date(item1.createdAt).getTime();
              if (timeNews > timeFollow) {
                await NewsNotificationModel.findOneAndUpdate(
                  {
                    _id: item1._id,
                    "notifications.userId": context.id,
                    type: "news",
                  },
                  {
                    $set: {
                      "notifications.$.count": 0,
                    },
                  }
                );
              }
            });
            await FollowModel.findOneAndUpdate(
              {
                followTo: context.id,
                followBy: item.userId,
                createBy: item.userId,
                "notifications.userId": context.id,
                type: "follow",
              },
              {
                $set: {
                  "notifications.$.count": 0,
                },
              }
            );
          });
          notificationQuestion.map(async (item) => {
            await QuestionModel.findOneAndUpdate(
              {
                _id: item.relateId,
                userId: item.userId,
                "notifications.userId": context.id,
                type: "comment",
              },
              {
                $set: {
                  "notifications.$.count": 0,
                },
              }
            );
          });
          notificationAnswer.map(async (item) => {
            console.log(context.id);
            await AnswerModel.findOneAndUpdate(
              {
                _id: item.relateId,
                userIdTo: context.id,
                "notifications.userId": context.id,
                type: "reply",
              },
              {
                $set: {
                  "notifications.$.count": 0,
                },
              }
            );
          });
          notificationVote.map(async (item) => {
            await VoteModel.findOneAndUpdate(
              {
                postId: item.relateId,
                userId: item.userId,
                "notifications.userId": context.id,
              },
              {
                $set: {
                  "notifications.$.count": 0,
                },
              }
            );
          });
          return { message: "check successfully" };
        } catch (error) {
          return { message: "check error" };
        }
      },
    },

    readNotification: {
      type: NotificationType,
      args: { id: { type: GraphQLID }, type: { type: GraphQLString } },
      resolve: async (parent, args, context) => {
        try {
          const notificationData = await NotificationModel.find({});
          notificationData.map(async (item) => {
            if (args.type === "news") {
              // news
              await NewsNotificationModel.findOneAndUpdate(
                {
                  userId: item.relateId,
                  "notifications._id": args.id,
                },
                {
                  $set: {
                    "notifications.$.read": false,
                  },
                }
              );
            } else if (args.type === "follow") {
              // follow
              await FollowModel.findOneAndUpdate(
                {
                  followTo: context.id,
                  followBy: item.userId,
                  createBy: item.userId,
                  "notifications._id": args.id,
                },
                {
                  $set: {
                    "notifications.$.read": false,
                  },
                }
              );
            } else if (args.type === "comment") {
              // comment
              await QuestionModel.findOneAndUpdate(
                {
                  _id: item.relateId,
                  userId: item.userId,
                  "notifications._id": args.id,
                  type: "comment",
                },
                {
                  $set: {
                    "notifications.$.read": false,
                  },
                }
              );
            } else if (args.type === "reply") {
              // reply
              await AnswerModel.findOneAndUpdate(
                {
                  _id: item.relateId,
                  userIdTo: context.id,
                  "notifications._id": args.id,
                  type: "reply",
                },
                {
                  $set: {
                    "notifications.$.read": false,
                  },
                }
              );
            } else if (args.type === "up") {
              // vote
              await VoteModel.findOneAndUpdate(
                {
                  postId: item.relateId,
                  userId: item.userId,
                  "notifications._id": args.id,
                  type: args.type,
                },
                {
                  $set: {
                    "notifications.$.read": false,
                  },
                }
              );
            } else if (args.type === "down") {
              // vote
              await VoteModel.findOneAndUpdate(
                {
                  postId: item.relateId,
                  userId: item.userId,
                  "notifications._id": args.id,
                  type: args.type,
                },
                {
                  $set: {
                    "notifications.$.read": false,
                  },
                }
              );
            }
          });
          return { message: "check successfully" };
        } catch (error) {
          return { message: "check error" };
        }
      },
    },

    hideNotification: {
      type: NotificationType,
      args: {
        id: { type: GraphQLID },
        type: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        try {
          const notificationData = await NotificationModel.find({});
          notificationData.map(async (item) => {
            if (args.type === "news") {
              // news
              await NewsNotificationModel.findOneAndUpdate(
                {
                  userId: item.relateId,
                  "notifications._id": args.id,
                },
                {
                  $set: {
                    "notifications.$.hide": false,
                  },
                }
              );
            } else if (args.type === "follow") {
              // follow
              await FollowModel.findOneAndUpdate(
                {
                  followTo: context.id,
                  followBy: item.userId,
                  createBy: item.userId,
                  "notifications._id": args.id,
                },
                {
                  $set: {
                    "notifications.$.hide": false,
                  },
                }
              );
            } else if (args.type === "comment") {
              // comment
              await QuestionModel.findOneAndUpdate(
                {
                  _id: item.relateId,
                  userId: item.userId,
                  "notifications._id": args.id,
                  type: args.type,
                },
                {
                  $set: {
                    "notifications.$.hide": false,
                  },
                }
              );
            } else if (args.type === "reply") {
              // reply
              await AnswerModel.findOneAndUpdate(
                {
                  _id: item.relateId,
                  userIdTo: context.id,
                  "notifications._id": args.id,
                  type: args.type,
                },
                {
                  $set: {
                    "notifications.$.hide": false,
                  },
                }
              );
            } else if (args.type === "up") {
              // vote
              await VoteModel.findOneAndUpdate(
                {
                  postId: item.relateId,
                  userId: item.userId,
                  "notifications._id": args.id,
                  type: args.type,
                },
                {
                  $set: {
                    "notifications.$.hide": false,
                  },
                }
              );
            } else if (args.type === "down") {
              // vote
              await VoteModel.findOneAndUpdate(
                {
                  postId: item.relateId,
                  userId: item.userId,
                  "notifications._id": args.id,
                  type: args.type,
                },
                {
                  $set: {
                    "notifications.$.hide": false,
                  },
                }
              );
            }
          });
          return { message: "check successfully" };
        } catch (error) {
          return { message: "check error" };
        }
      },
    },

    //=====================> new login wiht SSO <=====================

    new_login: {
      type: userType,
      args: {
        email: { type: GraphQLString },
        accountId: { type: GraphQLID },
        fullname: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        try {
          const id = await UserModel.findOne({ accountId: args.accountId });
          if (id) return { message: "user already have in your db", ok: true };
          if (!id) {
            let userData = await axios
              .get(`https://accounts.koompi.com/user/${args.accountId}`)
              .then((res) => {
                return res.data;
              });
            // console.log(userData.fullname);
            const newUser = await UserModel({
              email: args.email,
              accountId: args.accountId,
              fullname: userData.fullname,
            });
            await newUser.save();
            return { message: "Successully save new user", ok: false };
          }
        } catch (error) {
          console.log(error);
          return { message: "You have problem" };
        }
      },
    },

    //================>test follow<======================
    // follow_test:{
    //   type:userType,
    //   args:{
    //     followingsId:{type:GraphQLID},
    //     followersId:{type:GraphQLID}
    //   },
    //   resolve:async(parent,args,context) =>{
    //    const follow =  await UserModel({
    //      followings:[{
    //       followingsId:context.id,
    //      }]
    //    })
    //   }
    // }
    hideAllNotification: {
      type: NotificationType,
      resolve: async (parent, args, context) => {
        try {
          const notificationNews = await NotificationModel.find({
            type: "follow",
          });
          const notificationQuestion = await NotificationModel.find({
            type: "comment",
          });
          const notificationAnswer = await NotificationModel.find({
            type: "reply",
          });
          const notificationVote = await NotificationModel.find({
            type: "vote",
          });
          notificationNews.map(async (item) => {
            const news = await NewsNotificationModel.find({
              userId: item.relateId,
              type: "news",
            });
            const follower = await FollowModel.findOne({
              followTo: item.relateId,
            });
            const timeFollow = new Date(follower.createdAt).getTime();
            news.map(async (item1) => {
              const timeNews = new Date(item1.createdAt).getTime();
              if (timeNews > timeFollow) {
                await NewsNotificationModel.findOneAndUpdate(
                  {
                    _id: item1._id,
                    "notifications.userId": context.id,
                    type: "news",
                  },
                  {
                    $set: {
                      "notifications.$.hide": false,
                    },
                  }
                );
              }
            });
            await FollowModel.findOneAndUpdate(
              {
                followTo: context.id,
                followBy: item.userId,
                createBy: item.userId,
                "notifications.userId": context.id,
                type: "follow",
              },
              {
                $set: {
                  "notifications.$.hide": false,
                },
              }
            );
          });
          notificationQuestion.map(async (item) => {
            await QuestionModel.findOneAndUpdate(
              {
                _id: item.relateId,
                userId: item.userId,
                "notifications.userId": context.id,
                type: "comment",
              },
              {
                $set: {
                  "notifications.$.hide": false,
                },
              }
            );
          });
          notificationAnswer.map(async (item) => {
            await AnswerModel.findOneAndUpdate(
              {
                _id: item.relateId,
                userIdTo: context.id,
                "notifications.userId": context.id,
                type: "reply",
              },
              {
                $set: {
                  "notifications.$.hide": false,
                },
              }
            );
          });
          notificationVote.map(async (item) => {
            await VoteModel.findOneAndUpdate(
              {
                postId: item.relateId,
                userId: item.userId,
                "notifications.userId": context.id,
              },
              {
                $set: {
                  "notifications.$.hide": false,
                },
              }
            );
          });
          return { message: "check successfully" };
        } catch (error) {
          return { message: "check error" };
        }
      },
    },
  },
});
module.exports = RootMutation;
