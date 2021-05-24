const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;

//=================Modal Sections===============
const UserModel = require("../../models/user");
const NewsModel = require("../../models/news");
//================Type Sections==================
const UserType = require("../types/userType");
const NewsType = require("../types/newsType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //=============get users===============
    // get_users: {
    //   type: new GraphQLList(UserType),
    //   resolve(parent, args) {
    //     return User.find({}).sort({ createAt: -1 });
    //   },
    // },
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
  },
});

module.exports = RootQuery;
