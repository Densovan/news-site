import { gql } from "@apollo/client";

const ADD_NEWS = gql`
  mutation (
    $title: String!
    $des: String!
    $type: ID!
    $category: ID!
    $thumnail: String!
  ) {
    add_news(
      title: $title
      des: $des
      type: $type
      category: $category
      thumnail: $thumnail
    ) {
      message
    }
  }
`;

const DELETE_NEWS = gql`
  mutation ($id: ID!) {
    delete_news(id: $id) {
      message
    }
  }
`;

const EDIT_NEWS = gql`
  mutation (
    $id: ID!
    $title: String!
    $des: String!
    $type: ID!
    $category: ID!
    $thumnail: String!
  ) {
    edit_news(
      id: $id
      title: $title
      des: $des
      type: $type
      category: $category
      thumnail: $thumnail
    ) {
      message
    }
  }
`;

const UPDATE_USER = gql`
  mutation (
    $fullname: String
    $passwordHash: String
    $confirmPassword: String
    $newPassword: String
    $email: String
    $image: String
  ) {
    update_user(
      fullname: $fullname
      passwordHash: $passwordHash
      confirmPassword: $confirmPassword
      newPassword: $newPassword
      email: $email
      image: $image
    ) {
      message
    }
  }
`;
const FOLLOW = gql`
  mutation (
    $id: ID
    $followerId: ID
    $fullname: String
    $email: String
    $image: String
  ) {
    follow_user(
      id: $id
      followerId: $followerId
      fullname: $fullname
      email: $email
      image: $image
    ) {
      message
    }
  }
`;
const UNFOLLOW = gql`
  mutation ($id: ID!) {
    unfollower_user(id: $id) {
      message
    }
  }
`;

const COMMENT = gql`
  mutation (
      $userId: ID 
      $postId: ID 
      $question: String
    ) {
    comment(
      userId: $userId 
      postId: $postId 
      question: $question) {
        message
    }
  }
`;

const REPLY_COMMENT = gql`
  mutation (
    $userId: ID 
    $postId: ID 
    $answer: String
    $questionId: ID
  ) {
    reply(
      userId: $userId
      postId: $postId
      answer: $answer
      questionId: $questionId
    ) {
      message
    }
  }
`

export { ADD_NEWS, DELETE_NEWS, EDIT_NEWS, UPDATE_USER, FOLLOW, UNFOLLOW, COMMENT, REPLY_COMMENT };
