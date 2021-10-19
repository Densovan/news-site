const graphql = require("graphql");

const { GraphQLObjectType, GraphQLInt, GraphQLBoolean } = graphql;

const CheckNotification = new GraphQLObjectType({
  name: "checknoti",
  fields: () => ({
    userId: { type: GraphQLInt },
    read: { type: GraphQLBoolean },
    hire: { type: GraphQLBoolean },
    count: { type: GraphQLInt },
  }),
});

module.exports = CheckNotification;
