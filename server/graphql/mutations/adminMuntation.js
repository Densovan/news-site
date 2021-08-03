const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
} = graphql;
//================type===============
const CategoryType = require("../types/categoryType");
const Type = require("../types/type");
const memberType = require("../types/memberType");
const userType = require("../types/userType");
//===============model===============
const CategoryModel = require("../../models/category");
const TypeModel = require("../../models/type");
const MemberModel = require("../../models/member");
const UserModel = require("../../models/user");

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
    edit_cat: { 
      type: CategoryType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parents, args, context) => {
        try{
          const cat = await CategoryModel.find({}).sort({ createdAt: -1 });

          const key = [];
          cat.forEach(element => {
            if (element.id == args.id) {
              key.push("ok")
            }
          });

          if (key[0] == "ok") {
            await CategoryModel.findOneAndUpdate({ _id: args.id }, {
              ...args,
              name: args.name
            });
            return { message: "edit category successful" };
          }
          else{
            return { message: "you can't update category" };
          }
        }catch(error){
          console.log(error);
          throw error;
        }
      }
    },
    
    delete_cat: {
      type: CategoryType ,
      args: { 
        id: { type: GraphQLID },
      },
      resolve: async (parents, args, context) => {
        try{
          const cat = await CategoryModel.find({}).sort({ createdAt: -1 });
          
          const key = [];
          cat.forEach(element => {
            if (element.id == args.id) {
              key.push("ok")
            }
          });
          if (key[0] == "ok") {
            await CategoryModel.findByIdAndDelete(args.id);
            return { message: "delete category successful" }; 
          }
          else{
            return { message: "you can't delete category" };
          } 
        }catch(e){
          throw e
        }
      }
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
    edit_type: { 
      type: Type,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parents, args, context) => {
        try{
          const type = await TypeModel.find({}).sort({ createdAt: -1 });

          const key = [];
          type.forEach(element => {
            if (element.id == args.id) {
              key.push("ok")
            }
          });

          if (key[0] == "ok") {
            await TypeModel.findOneAndUpdate({ _id: args.id }, {
              ...args,
              name: args.name
            });
            return { message: "Edit type successful" };
          }
          else{
            return { message: "You can't update type" };
          }
        }catch(error){
          console.log(error);
          throw error;
        }
      }
    },
    
    delete_type: {
      type: Type,
      args: { 
        id: { type: GraphQLID },
      },
      resolve: async (parents, args, context) => {
        try{
          const type = await TypeModel.find({}).sort({ createdAt: -1 });

          const key = [];
          type.forEach(element => {
            if (element.id == args.id) {
              key.push("ok")
            }
          });

          if (key[0] == "ok") {
            await TypeModel.findByIdAndDelete(args.id);
            return { message: "delete type successful" };
          }
          else{
            return { message: "You can't delete type" };
          }
        }catch(e){
          throw e
        }
      }
    },
    // ==============add memeber================
    add_member: {
      type: memberType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        try {
          const member = new MemberModel({ ...args, createBy: context.id });
          await member.save();
          return { message: "add member successful" };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    //=====================edit member==============
    edit_member: {
      type: memberType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        try {
          await MemberModel.findOneAndUpdate({ ...args, createBy: context.id });
          return { message: "Update member successful" };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    //===============delete member=============
    delete_member: {
      type: memberType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args, context) => {
        await MemberModel.deleteOne({ _id: args.id, createBy: context.id });
        return { message: "delete member successful" };
      },
    },

    // =============ban user==============
    ban_user: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        ban: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: async (parent, args, context) => {
        try {
          await UserModel.findByIdAndUpdate(
            { _id: args.id },
            { ban: args.ban },
            { createBy: context.id }
          );
          return {
            message: "This User has been baned",
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
  },
});
module.exports = RootMutation;
