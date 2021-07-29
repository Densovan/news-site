const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;

//=================Modal Sections===============
const UserModel = require("../../models/user");
const NewsModel = require("../../models/news");
const Category = require("../../models/category");
const Types = require("../../models/type");
//================Type Sections==================
const UserType = require("../types/userType");
const CategoryType = require("../types/categoryType");
const Type = require("../types/type");
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
          .sort({ createdAt: -1 });
      },
    },
    // =========get catgory==============
    get_categories: {
      type: new GraphQLList(CategoryType),
      resolve: (parent, args) => {
        return Category.find({}).sort({ createdAt: -1 });
      },
    },
    // =========get catgory==============
    get_types: {
      type: new GraphQLList(Type),
      resolve: (parent, args) => {
        return Types.find({}).sort({ createdAt: -1 });
      },
    },
  },
});

module.exports = RootQuery;
