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
  mutation ($followTo: ID!) {
    follow(followTo: $followTo) {
      message
    }
  }
`;

export { ADD_NEWS, DELETE_NEWS, EDIT_NEWS, UPDATE_USER, FOLLOW };
