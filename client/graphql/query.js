import { gql } from "@apollo/client";

const GET_USERS = gql`
  query {
    get_users {
      fullname
      email
      role
      id
      createAt
    }
  }
`;
const GET_USER = gql`
  query {
    get_user {
      fullname
      email
      role
      id
      createdAt
    }
  }
`;

export { GET_USERS, GET_USER };
