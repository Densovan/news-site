const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const Test = new GraphQLObjectType({
  name: "test",
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    createAt: {
      type: GraphQLString,
    }
  }),
});
module.exports = Test;