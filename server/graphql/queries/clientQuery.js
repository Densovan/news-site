const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = graphql;

//=================Modal Sections===============
const UserModel = require("../../models/user");
const NewsModel = require("../../models/news");
const Category = require("../../models/category");
const Types = require("../../models/type");
const NotificationModel = require("../../models/notification");
const LikeModel = require("../../models/like");
const NotiModel = require("../../models/notifications");
const NotiCheckModel = require("../../models/notiCheck");
const FollowModel = require("../../models/follow");
const SaveNewsModel = require("../../models/saveNews");
const LikeTopDownModel = require("../../models/likeTopDown");
const VoteModel = require("../../models/vote");
const ChatModel = require("../../models/chat");

//================Type Sections==================
const CategoryType = require("../types/categoryType");
const Type = require("../types/type");
const NewsType = require("../types/newsType");
const UserType = require("../types/userType");
const NotificationType = require("../types/notificationType");
const NotiType = require("../types/notiType");
const NotiCheckType = require("../types/notiCheckType");
const FollowType = require("../types/followType");
const saveNews = require("../types/saveNewsType");
const SaveNewsType = require("../types/saveNewsType");
const likeTopDownType = require("../types/likeTopDownType");
const voteType = require("../types/voteType");
const ChatType = require("../types/chat");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //=============get users===============
    get_users: {
      type: new GraphQLList(UserType),
      resolve(parent, args, context) {
        return UserModel.find({});
      },
    },
    get_user: {
      type: UserType,
      resolve(parent, args, context) {
        return UserModel.findById(context.id);
      },
    },
    get_user_by_id: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args, context) {
        return UserModel.findById({ _id: args.id });
      },
    },

    //============get news===============
    get_all_news: {
      type: new GraphQLList(NewsType),
      args: {
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parent, { limit = null, offset = null }) => {
        return NewsModel.find({})
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },

    //=============get news created at least 24h===================
    get_all_news_today: {
      type: new GraphQLList(NewsType),
      args: {
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parent, { limit = null, offset = null }) => {
        // return NewsModel.find({})
        return NewsModel.find({
          createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        })
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },

    //==============get_new_sort-top=================
    get_all_news_top: {
      type: new GraphQLList(NewsType),
      args: {
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parent, { limit = null, offset = null }) => {
        return NewsModel.find({})
          .limit(limit)
          .skip(offset)
          .sort({ voteCount: -1 });
      },
    },

    get_news: {
      type: NewsType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return NewsModel.findOne({ _id: args.id });
      },
    },

    get_allnews_by_cat: {
      type: new GraphQLList(NewsType),
      args: {
        id: { type: GraphQLID },
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parents, args, { limit = null, offset = null }) => {
        return NewsModel.find({ category: args.id })
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },

    get_allnews_by_type: {
      type: new GraphQLList(NewsType),
      args: {
        id: { type: GraphQLString },
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve(parents, args, { limit = null, offset = null }) {
        return NewsModel.find({ type: args.id })
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },

    get_all_news_by_type_learn: {
      type: new GraphQLList(NewsType),
      args: {
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve(parents, { limit = null, offset = null }) {
        return NewsModel.find({ type: "60ab9d4a314c8a3b207849e6" })
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },

    get_all_news_by_type_feature: {
      type: new GraphQLList(NewsType),
      args: {
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve(parents, { limit = null, offset = null }) {
        return NewsModel.find({ type: "60ab789315cdbd63c5d57fa0" })
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },

    get_all_news_by_type_news: {
      type: new GraphQLList(NewsType),
      args: {
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve(parents, { limit = null, offset = null }) {
        return NewsModel.find({ type: "60ab9d4a314c8a3b207849e6" })
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },

    get_allnews_type_by_cat: {
      type: new GraphQLList(NewsType),
      args: {
        id: { type: GraphQLID },
        typeId: { type: GraphQLID },
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parents, args, { limit = null, offset = null }) => {
        return NewsModel.find({ category: args.id, type: args.typeId })
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },

    get_allnews_type_by_cat_feature: {
      type: new GraphQLList(NewsType),
      args: {
        id: { type: GraphQLID },
        typeId: { type: GraphQLID },
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parents, args) => {
        const { limit = null, offset = null, id } = args;
        return NewsModel.find({
          category: id,
          type: "60ab789315cdbd63c5d57fa0",
        })
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },
    get_allnews_type_by_cat_learn: {
      type: new GraphQLList(NewsType),
      args: {
        id: { type: GraphQLID },
        typeId: { type: GraphQLID },
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parents, args) => {
        const { limit = null, offset = null, id } = args;
        return NewsModel.find({
          category: id,
          type: "60ab9d4a314c8a3b207849e6",
        })
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },

    get_allnews_type_by_cat_news: {
      type: new GraphQLList(NewsType),
      args: {
        id: { type: GraphQLID },
        typeId: { type: GraphQLID },
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parents, args) => {
        const { limit = null, offset = null, id } = args;
        return NewsModel.find({
          category: id,
          type: "60b125935b23dcef7bea2dad",
        })
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },

    //==============get own news==============
    get_own_news: {
      type: new GraphQLList(NewsType),
      args: {
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parent, args, context) => {
        const { limit = null, offset = null } = args;
        return NewsModel.find({ createBy: context.id })
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },

    get_own_news_by_id: {
      type: new GraphQLList(NewsType),
      args: {
        id: { type: GraphQLID },
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parent, args, context) => {
        const { limit = null, offset = null } = args;
        return NewsModel.find({ createBy: args.id })
          .limit(limit)
          .skip(offset)
          .sort({ createdAt: -1 });
      },
    },

    get_news_by_slug: {
      type: NewsType,
      args: { slug: { type: GraphQLString } },
      resolve: (paren, args) => {
        return NewsModel.findOne({ slug: args.slug });
      },
    },
    get_news_by_title: {
      type: NewsType,
      args: { title: { type: GraphQLString } },
      resolve: (paren, args) => {
        return NewsModel.findOne({ title: args.title });
      },
    },

    get_cats: {
      type: new GraphQLList(CategoryType),
      resolve: (parent, args) => {
        return Category.find({}).sort({ createdAt: -1 });
      },
    },
    get_types: {
      type: new GraphQLList(Type),
      resolve: (parent, args) => {
        return Types.find({}).sort({ createdAt: -1 });
      },
    },

    query_notification: {
      type: NotificationType,
    },
    get_notifications: {
      type: NotificationType,
      resolve: async (parent, args, context) => {
        try {
          return NotificationModel.findOne({ userId: context.id });
        } catch {
          console.log("error");
        }
      },
    },
    show_notifications: {
      type: NotificationType,
      resolve: async (parent, args, context) => {
        const notification = await NotificationModel.findOne({
          userId: context.id,
        });
        try {
          await LikeModel.updateMany(
            { postId: notification.postId },
            { count: 0 }
          );
          return NotificationModel.findOne({ userId: context.id });
        } catch (e) {
          console.log(e);
          throw e;
        }
      },
    },
    get_notification_by_user: {
      type: new GraphQLList(NotiType),
      resolve: (parent, args, context) => {
        return NotiModel.find({
          ownerId: context.id,
          // followTo: context.id,
        }).sort({ createdAt: -1 });
      },
    },
    get_notification_check_by_user: {
      type: new GraphQLList(NotiCheckType),
      args: {
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parent, args, context) => {
        const { limit = null, offset = null } = args;
        return NotiCheckModel.find({ ownerId: context.id })
          .limit(limit)
          .skip(offset)
          .sort({
            createdAt: -1,
          });
      },
    },
    //==============follow===========
    // get_follower: {
    //   type: new GraphQLList(FollowType),
    //   resolve: (parent, args, context) => {
    //     return FollowModel.find({ followTo: context.id });
    //   },
    // },
    // get_following: {
    //   type: new GraphQLList(FollowType),
    //   resolve: (parent, args, context) => {
    //     return FollowModel.find({ followTo: context.id });
    //   },
    // },
    get_follows: {
      type: new GraphQLList(FollowType),
      resolve: (parent, args, context) => {
        return FollowModel.find({});
      },
    },
    get_follows_by_user: {
      type: FollowType,
      args: {
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parent, args, context) => {
        const { limit = null, offset = null } = args;
        return FollowModel.find({ createBy: context.id })
          .limit(limit)
          .skip(offset)
          .sort({
            createdAt: -1,
          });
      },
    },
    get_save_news_by_userId: {
      type: new GraphQLList(SaveNewsType),
      args: {
        limit: {
          name: "limit",
          type: GraphQLInt,
        },
        offset: {
          name: "offset",
          type: GraphQLInt,
        },
      },
      resolve: (parent, args, context) => {
        const { limit = null, offset = null } = args;
        return SaveNewsModel.find({ userId: context.id })
          .limit(limit)
          .skip(offset)
          .sort({
            createdAt: -1,
          });
      },
    },
    get_count_up_down: {
      type: new GraphQLList(likeTopDownType),
      resolve: (parent, args, context) => {
        return LikeTopDownModel.find({ userId: context.id });
      },
    },
    get_vote_up_down: {
      type: new GraphQLList(voteType),
      resolve: (parent, args, context) => {
        return VoteModel.find({ userId: context.id });
      },
    },

    get_all_vote_up_down: {
      type: new GraphQLList(voteType),
      resolve: (parent, args, context) => {
        return VoteModel.find({}).sort({ createdAt: -1 });
      },
    },

    //==============Search title news keyword==================
    search_news_title: {
      type: new GraphQLList(NewsType),
      // type: NewsType,
      args: {
        limit: {
          // name: "limit",
          type: GraphQLInt,
        },
        search: {
          type: GraphQLString,
        },
        offset: {
          type: GraphQLInt,
        },
        // title: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        const { search = null, offset = 0, limit = 6 } = args;
        const count = await NewsModel.countDocuments({});
        // console.log(count);
        return NewsModel.find({
          title: { $regex: search, $options: "i" },
          // totalPages: {count},
        })
          .limit(limit)
          .skip(offset)
          .sort({
            createdAt: -1,
          });
      },
    },
    //=============Get Chat================
    get_chats: {
      type: new GraphQLList(ChatType),
      resolve: (parent, args, context) => {
        return ChatModel.find({});
      },
    }
  },
});

module.exports = RootQuery;
