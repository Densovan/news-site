const graphql = require("graphql");

//=============model=============
const NewsNotificationModel = require("../../models/newsNotification");
const ConversationNotificationModel = require("../../models/conversationNotification");
const VoteModel = require("../../models/vote");
const FollowModel = require("../../models/follow");
const User = require("../../models/user");
const QuestionModel = require("../../models/comment/question");
const AnswerModel = require("../../models/comment/answer");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const NotificationType = new GraphQLObjectType({
  name: "notification",
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    userId: { type: GraphQLID },
    ownerId: { type: GraphQLID },
    relateId: { type: GraphQLID },
    type: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    follow: {
      type: FollowType,
      resolve: async (parent, args, context) => {
        if (parent.type === "follow") {
          const follow = await FollowModel.findOne({
            followTo: context.id,
            followBy: parent.userId,
            createBy: parent.userId,
          });
          return follow
        }
      },
    },
    news: {
      type: new GraphQLList(NewsNotificationType),
      resolve: async (parent, args, context) => {
        if (parent.type === "follow") {
          const follower = await FollowModel.findOne({ followTo: parent.relateId });
          const timeFollow = new Date(follower.createdAt).getTime()
          if (parent.userId === context.id) {
            const news = [];
            const data = await NewsNotificationModel.find({ userId: parent.relateId })
            data.forEach(item => {
              const timeNews = new Date(item.createdAt).getTime();
              if (timeNews > timeFollow) {
                news.push(item)
              }
            });
            return news;
          }
        }
      },
    },
    comment: {
      type: QuestionType,
      resolve: async (parent, args, context) => {
        if (parent.type === "comment") {
          const question = await QuestionModel.findOne({
            _id: parent.relateId,
            userId: parent.userId,
            type: "comment"
          });
          return question
        }
      },
    },
    reply:{
      type: AnswerType,
      resolve: async (parent, args, context) => {
        if (parent.type === "reply") {
          const answer = await AnswerModel.findOne({
            userId: context.id,
            _id: parent.relateId,
            type: "reply"
          });
          return answer
        }
      },
    },
    vote: {
      type: VoteType,
      resolve: async (parent, args, context) => {
        if (parent.type === "vote") {
          const vote = await VoteModel.findOne({
            postId: parent.relateId,
            userId: parent.userId,
          });
          return vote
        }
      },
    },
  }),
});

module.exports = NotificationType;

//=============type===========
const NewsNotificationType = require("./newsNotificationType");
const ConversationNotificationType = require("./conversationNotificationType");
const VoteType = require("./voteType");
const FollowType = require("./followType");
const userType = require("./userType");
const QuestionType = require("./comment/questionType");
const AnswerType = require("./comment/answerType")

