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
    }
  }
`;
const GET_CATEGORIES = gql`
  query {
    get_cats {
      name
      id
      createAt
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

export {
  GET_USERS,
  GET_USER,
  GET_CATEGORIES,
  GET_TYPES,
  GET_OWN_NEWS,
  GET_NEWS,
  GET_ALL_NEWS,
};
