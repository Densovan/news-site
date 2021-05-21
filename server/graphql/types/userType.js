const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    timestamps: { type: GraphQLString },
    token: { type: GraphQLString },
    message: { type: GraphQLString },
    role: { type: GraphQLString },

    id: {
      type: GraphQLID,
    },
  }),
});

module.exports = userType;
