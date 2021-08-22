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
      status
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
const DELETE_NEWS_SAVE = gql`
  mutation ($id: ID!) {
    delete_save_news(id: $id) {
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
      status
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
    $bio: String
    $gender: String
  ) {
    update_user(
      fullname: $fullname
      passwordHash: $passwordHash
      confirmPassword: $confirmPassword
      newPassword: $newPassword
      email: $email
      image: $image
      bio: $bio
      gender: $gender
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
  mutation ($userId: ID, $postId: ID, $question: String, $ownerId: ID) {
    comment(
      userId: $userId
      postId: $postId
      question: $question
      ownerId: $ownerId
    ) {
      message
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation ($id: ID!) {
    delete_comment(id: $id) {
      message
    }
  }
`;

const EDIT_COMMENT = gql`
  mutation ($id: ID, $userId: ID, $postId: ID, $question: String) {
    edit_comment(
      id: $id
      userId: $userId
      postId: $postId
      question: $question
    ) {
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
    $ownerId: ID
  ) {
    reply(
      userId: $userId
      postId: $postId
      answer: $answer
      questionId: $questionId
      ownerId: $ownerId
    ) {
      message
    }
  }
`;
const DELETE_REPLY = gql`
  mutation ($id: ID!) {
    delete_reply(id: $id) {
      message
    }
  }
`;

const EDIT_REPLY = gql`
  mutation ($id: ID, $userId: ID, $answer: String) {
    edit_reply(id: $id, userId: $userId, answer: $answer) {
      message
    }
  }
`;

const LIKE_ARTICLE = gql`
  mutation ($postId: ID!, $ownerId: ID) {
    like(postId: $postId, ownerId: $ownerId) {
      message
    }
  }
`;

const NOTIFICATION_CHECK = gql`
  mutation ($ownerId: ID!) {
    notification_check(ownerId: $ownerId) {
      message
    }
  }
`;
const DELETE_LIKE_NOTIFICATION = gql`
  mutation ($id: ID!) {
    delete_like_in_noti(id: $id) {
      message
    }
  }
`;

const DELETE_COMMENT_NOTIFICATION = gql`
  mutation ($id: ID!) {
    delete_comment_in_noti(id: $id) {
      message
    }
  }
`;
const DELETE_REPLY_IN_NOTI = gql`
  mutation ($id: ID!) {
    delete_reply_in_noti(id: $id) {
      message
    }
  }
`;

const LIKE_COUNT_UP = gql`
  mutation ($postId: ID!, $ownerId: ID!) {
    like_count_up(postId: $postId, ownerId: $ownerId) {
      message
    }
  }
`;

const LIKE_COUNT_DOWN = gql`
  mutation ($postId: ID!, $ownerId: ID!) {
    like_count_down(postId: $postId, ownerId: $ownerId) {
      message
    }
  }
`;

const VOTE_UP_DOWN = gql`
  mutation ($postId: ID!, $ownerId: ID!, $type: String!, $count: Int!) {
    voteUpDown(postId: $postId, ownerId: $ownerId, type: $type, count: $count) {
      message
    }
  }
`;

const SAVE_NEWS = gql`
  mutation (
    $news_id: ID
    $title: String!
    $des: String!
    $category: ID!
    $createBy: ID!
    $type: ID!
    $thumnail: String!
    $slug: String
  ) {
    save_news(
      news_id: $news_id
      title: $title
      des: $des
      category: $category
      createBy: $createBy
      thumnail: $thumnail
      slug: $slug
      type: $type
    ) {
      message
    }
  }
`;

export {
  // LIKE,
  DELETE_NEWS_SAVE,
  SAVE_NEWS,
  ADD_NEWS,
  DELETE_NEWS,
  EDIT_NEWS,
  UPDATE_USER,
  FOLLOW,
  UNFOLLOW,
  COMMENT,
  DELETE_COMMENT,
  REPLY_COMMENT,
  DELETE_REPLY,
  EDIT_COMMENT,
  EDIT_REPLY,
  LIKE_ARTICLE,
  NOTIFICATION_CHECK,
  DELETE_COMMENT_NOTIFICATION,
  DELETE_REPLY_IN_NOTI,
  DELETE_LIKE_NOTIFICATION,
  LIKE_COUNT_UP,
  LIKE_COUNT_DOWN,
  VOTE_UP_DOWN,
};
