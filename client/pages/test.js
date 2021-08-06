import React from "react";

import client from "../apollo-client";
import { useQuery, gql } from "@apollo/client";

// const QUERY = gql`
//   query {
//     get_users {
//       fullname
//     }
//   }
// `;

const test = ({ data }) => {
  // const { data, loading, error } = useQuery(QUERY);
  // if (loading) return "loading...";
  // if (error) {
  //   console.error(error);
  //   return null;
  // }
  console.log(data);
  return (
    <div>
      {data.get_all_news_by_type_learn.map((res) => (
        <div>
          <h1>{res.id}</h1>
        </div>
      ))}
    </div>
  );
};

export default test;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Users {
        get_all_news_by_type_learn(limit: 8, offset: 0) {
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
    `,
  });
  return {
    props: {
      data: data,
    },
  };
}
