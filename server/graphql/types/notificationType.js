const graphql = require("graphql");

//=============model=============
const NewsNotificationModel = require("../../models/newsNotification");
const ConversationNotificationModel = require("../../models/conversationNotification");
const VoteNotificationModel = require("../../models/voteNotification");
const FollowModel = require("../../models/follow");
const User = require("../../models/user");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const NotificationType = new GraphQLObjectType({
  name: "notification",
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    userId: { type: GraphQLID },
    ownerId: { type:  GraphQLID },
    relateId: { type:  GraphQLID },
    type: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    follow:{
      type: new GraphQLList(FollowType),
      resolve: async (parent, args, context) => {
        if (parent.type === "follow"){
          const data = []
          const follow = await FollowModel.find({ followTo: context.id, followBy: parent.userId, createBy: parent.userId })
          if (follow.length > 0) {
            follow.forEach(element => {
              data.push(element)
            });
          }
          if (data.length > 0) {
            return data 
          }
        }
      } 
    },
    news: {
      type: new GraphQLList(NewsNotificationType),
      resolve: async (parent, args, context) => {
        if (parent.type === "follow") {
          const data = []
          if (parent.userId === context.id) {
            const news = await NewsNotificationModel.find({ userId: parent.relateId })
            if (news.length > 0) {
              news.forEach(element => {
                data.push(element)
              })
            }
          }
          if(data.length > 0){
            return data
          }
        }
      }
    },
    conversation: {
      type: new GraphQLList(ConversationNotificationType),
      resolve: async (parent, args, context) => {
        if (parent.type === "conversation") {
          const conversationOwner = await ConversationNotificationModel.find({ postId: parent.relateId, userId: parent.userId })
          const conversationTo = await ConversationNotificationModel.find({ userId2: context.id, postId: parent.relateId })
          if (conversationTo.length > 0) {
            const data = []
            conversationTo.forEach(element => {
              if (element.ownerId !== context.id) {
                data.push(element)
              }
            });
            if (data.length > 0) {
              return data
            }
          }
          if (conversationOwner.length > 0) {
            const data = []
            conversationOwner.forEach(element => {
              data.push(element)
            });
            if (data.length > 0) {
              return data
            }
          }
        }
      },
    },
    vote: {
      type: new GraphQLList(VoteNotificationType),
      resolve: async (parent, args, context)  => {
        if (parent.type === "vote"){
          const data = []
          const vote = await VoteNotificationModel.find({ postId: parent.relateId, userId: parent.userId })
          if (vote.length > 0) {
            vote.forEach(element => {
              data.push(element)
            });
          }
          if(data.length > 0){
            return data
          }
        }
      }
    }
  }),
});

module.exports = NotificationType;

//=============type===========
const NewsNotificationType = require("./newsNotificationType");
const ConversationNotificationType = require("./conversationNotificationType");
const VoteNotificationType = require("./voteNotificationType");
const FollowType = require("./followType");
const userType = require("./userType");

