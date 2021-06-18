import { gql } from "@apollo/client";

const GET_USERS = gql`
  query {
    get_users {
      fullname
      image
      email
      role
      id
      createdAt
      news {
        title
      }
      follower {
        followBy
        userFollower {
          fullname
        }
      }
      following {
        followTo
        userFollowing {
          fullname
        }
      }
    }
  }
`;
const GET_USER_BY_ID = gql`
  query ($id: ID!) {
    get_user_by_id(id: $id) {
      image
      fullname
      email
      role
      id
      createdAt
      news {
        title
      }
      follower {
        followBy
        follow
        userFollower {
          fullname
          image
        }
      }
      following {
        follow
        followTo
        userFollowing {
          fullname
          image
        }
      }
    }
  }
`;
const GET_USER = gql`
  query {
    get_user {
      image
      fullname
      email
      role
      id
      createdAt
      news {
        title
      }
      follower {
        followBy
        follow
        userFollower {
          fullname
          image
        }
      }
      following {
        followTo
        follow
        userFollowing {
          fullname
          image
        }
      }
    }
  }
`;
const GET_CATEGORIES = gql`
  query {
    get_cats {
      name
      id
      createdAt
    }
  }
`;

const GET_TYPES = gql`
  query {
    get_types {
      name
      id
      createAt
    }
  }
`;

const GET_OWN_NEWS = gql`
  query {
    get_own_news {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_NEWS = gql`
  query ($id: ID!) {
    get_news(id: $id) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_ALL_NEWS = gql`
  query ($limit: Int!, $offset: Int!) {
    get_all_news(limit: $limit, offset: $offset) {
      title
      createdAt
      id
      category
      thumnail
      type
      des
      slug
      user {
        fullname
        id
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_ALL_NEWS_BY_TYPE_NEWS = gql`
  query ($limit: Int!, $offset: Int!) {
    get_allnews_by_type(
      limit: $limit
      offset: $offset
      id: "60b125935b23dcef7bea2dad"
    ) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
        id
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_ALL_NEWS_BY_TYPE_LEARN = gql`
  query ($limit: Int!, $offset: Int!) {
    get_allnews_by_type(
      limit: $limit
      offset: $offset
      id: "60ab9d4a314c8a3b207849e6"
    ) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_ALL_NEWS_BY_TYPE_FEATURE = gql`
  query ($limit: Int!, $offset: Int!) {
    get_allnews_by_type(
      limit: $limit
      offset: $offset
      id: "60ab789315cdbd63c5d57fa0"
    ) {
      title
      slug
      createdAt
      id
      category
      thumnail
      type
      des
      user {
        fullname
        image
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_NEWS_BY_SLUG = gql`
  query ($slug: String!) {
    get_news_by_slug(slug: $slug) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_NEWS_BY_CATS = gql`
  query ($id: ID!, $limit: Int!, $offset: Int!) {
    get_allnews_by_cat(id: $id, limit: $limit, offset: $offset) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_NEWS_LEARN_BY_CAT = gql`
  query ($id: ID, $limit: Int!, $offset: Int!) {
    get_allnews_type_by_cat(
      id: $id
      limit: $limit
      offset: $offset
      typeId: "60ab9d4a314c8a3b207849e6"
    ) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_NEWS_NEWS_BY_CAT = gql`
  query ($id: ID, $limit: Int!, $offset: Int!) {
    get_allnews_type_by_cat(
      id: $id
      limit: $limit
      offset: $offset
      typeId: "60b125935b23dcef7bea2dad"
    ) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_NEWS_FEATURE_BY_CAT = gql`
  query ($id: ID, $limit: Int!, $offset: Int!) {
    get_allnews_type_by_cat(
      id: $id
      limit: $limit
      offset: $offset
      typeId: "60ab789315cdbd63c5d57fa0"
    ) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;
const GET_FOLLOWER = gql`
  query {
    get_follower {
      followTo
      followBy
      follow
      userFollowing {
        fullname
        id
      }
    }
  }
`;
const GET_FOLLOWING = gql`
  query {
    get_following {
      followTo
      followBy
      follow
      userFollowing {
        fullname
        id
      }
    }
  }
`;

export {
  GET_FOLLOWING,
  GET_FOLLOWER,
  GET_USER_BY_ID,
  GET_NEWS_FEATURE_BY_CAT,
  GET_NEWS_NEWS_BY_CAT,
  GET_NEWS_LEARN_BY_CAT,
  GET_NEWS_BY_CATS,
  GET_NEWS_BY_SLUG,
  GET_USERS,
  GET_USER,
  GET_CATEGORIES,
  GET_TYPES,
  GET_OWN_NEWS,
  GET_NEWS,
  GET_ALL_NEWS,
  GET_ALL_NEWS_BY_TYPE_NEWS,
  GET_ALL_NEWS_BY_TYPE_LEARN,
  GET_ALL_NEWS_BY_TYPE_FEATURE,
};
