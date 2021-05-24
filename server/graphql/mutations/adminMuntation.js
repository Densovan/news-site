const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;
//================type===============
const CategoryType = require("../types/categoryType");
const Type = require("../types/type");
//===============model===============
const CategoryModel = require("../../models/category");
const TypeModel = require("../../models/type");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    //============add category=============
    add_cat: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        // createBy: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parents, args, context) => {
        try {
          const existCategory = await CategoryModel.findOne({
            name: args.name,
          });
          if (!existCategory) {
            const category = new CategoryModel({
              ...args,
              createBy: context.id,
            });
            await category.save();
            return {
              message: "Add Category Successful",
            };
          } else {
            return { message: "This category already exist" };
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    //======================add type================
    add_type: {
      type: Type,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        // createBy: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parents, args, context) => {
        try {
          const existType = await TypeModel.findOne({
            name: args.name,
          });
          if (!existType) {
            const type = new TypeModel({
              ...args,
              createBy: context.id,
            });
            await type.save();
            return {
              message: "Add type Successful",
            };
          } else {
            return { message: "This type already exist" };
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
