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
const NotiModel = require("../../models/notifications");
const NotiCheckModel = require("../../models/notiCheck");

//================Type Sections==================
const CategoryType = require("../types/categoryType");
const Type = require("../types/type");
const NewsType = require("../types/newsType");
const UserType = require("../types/userType");
const NotiType = require("../types/notiType");
const NotiCheckType = require("../types/notiCheckType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //=============get users===============
    get_users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return UserModel.find({}).sort({ createAt: -1 });
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
        return NewsModel.find({ type: "60b125935b23dcef7bea2dad" })
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
      resolve: (parent, args, context, { limit = null, offset = null }) => {
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
      },
      resolve: (parent, args, context) => {
        return NewsModel.findById({ _id: args.id });
      },
    },

    get_news_by_slug: {
      type: NewsType,
      args: { slug: { type: GraphQLString } },
      resolve: (paren, args) => {
        return NewsModel.findOne({ slug: args.slug });
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
    get_notification_by_user: {
      type: new GraphQLList(NotiType),
      resolve: (parent, args, context) => {
        return NotiModel.find({ ownerId: context.id });
      },
    },
    get_notification_check_by_user: {
      type: new GraphQLList(NotiCheckType),
      resolve: (parent, args, context) => {
        return NotiCheckModel.find({ ownerId: context.id });
      },
    },
    // get_news_by_following: {
    //   type: NewsType,
    //   resolve: async (parent, args, context) => {
    //     try {
    //       const currentUser = await UserModel.findById(context.id);
    //       if (currentUser) {
    //         const userPost = await NewsModel.find({ createBy: context.id });
    //         const friPost = await UserModel(
    //           currentUser.following.map((res) => {
    //             return res.id;
    //           })
    //         );
    //         console.log(friPost);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       throw error;
    //     }
    //   },
    // },
  },
});

module.exports = RootQuery;
