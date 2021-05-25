const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;

//=================Modal Sections===============
const UserModel = require("../../models/user");
const NewsModel = require("../../models/news");
const Category = require("../../models/category");
const Types = require("../../models/type");
//================Type Sections==================
const CategoryType = require("../types/categoryType");
const Type = require("../types/type");
const UserType = require("../types/userType");
const NewsType = require("../types/newsType");

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
          .sort({ CreateAt: -1 });
      },
    },
    get_news: {
      type: NewsType,
      args: { id: { type: GraphQLString } },
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
          .sort({ createAt: -1 });
      },
    },

    get_allnews_by_type: {
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
        return NewsModel.find({ type: args.id })
          .limit(limit)
          .skip(offset)
          .sort({ createAt: -1 });
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
  },
});

module.exports = RootQuery;
