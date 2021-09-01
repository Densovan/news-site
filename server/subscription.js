// const { PubSub } = require("graphql-subscriptions");
// const gql = require("graphql-tag");
// const { makeExecutableSchema } = require("graphql-tools");

// const pubsub = new PubSub();

// const typeDefs = gql`
//     type Query{
//         # vote:[vote]
//     }
//     # type vote{
//     #     id:String
//     #     message:String
//     #     voteUp:String
//     #     voteDown:String
//     #     count:String
//     #     ownerId:String
//     #     postId:String
//     #     type:String
//     #     userId:String
//     #     createdAt:String
//     # }
//     type savenews{
// userId:String
// title:String
// des:String
// category:String
// thumnail:String
// type::String
// message:String
// slug:String
// createBy:String
// createAt:String
// followTo:String
// status:String
// id:String
// news_id:String

//     }
//     type Subscription{
//         newData:savenews
//     }
// `;

// const resolvers = {
//   Subscription: {
//     newData: {
//       subscribe: () => pubsub.asyncIterator("newMessage"),
//     },
//   },
// };

// exports.pubsub = pubsub;
// exports.schema = makeExecutableSchema({ typeDefs, resolvers });

const { PubSub } = require("graphql-subscriptions");
const gql = require("graphql-tag");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const pubsub = new PubSub();

const typeDefs = gql`
  type Query {
    savenews: [data]
    chats: [chat]
  }

  type data {
    userId: ID
    title: String
    des: String
    category: String
    thumnail: String
    type: String
    message: String
    slug: String
    createBy: String
    createAt: String
    followTo: String
    status: String
    id: ID
    news_id: ID
  }

  type chat {
    userId: ID
    body: String
  }
  type Subscription {
    newData: data
    newChat: chat
  }
`;

const resolvers = {
  Subscription: {
    newData: {
      subscribe: () => pubsub.asyncIterator("newMessage"),
    },
    newChat: {
      subscribe: () => pubsub.asyncIterator("newChat"),
    },
  },
};

exports.pubsub = pubsub;
exports.schema = makeExecutableSchema({ typeDefs, resolvers });
