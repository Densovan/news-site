import React from "react";

import client from "../../libs/apollo-client";
import { useQuery, gql } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_LEARN } from "../../graphql/query";

// const QUERY = gql`
//   query {
//     get_users {
//       fullname
//     }
//   }
// `;

const Test = ({ data, fetchMore }) => {
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
        <div key={res.id}>
          <h1>{res.id}</h1>
        </div>
      ))}
    </div>
  );
};

export default Test;

export async function getServerSideProps() {
  // const { data, fetchMore } = await client.query({
  //   query: gql`
  //     query Users {
  //       get_all_news_by_type_learn(limit: 2, offset: 0) {
  //         title
  //         createdAt
  //         id
  //         category
  //         thumnail
  //         type
  //         slug
  //         des
  //         user {
  //           fullname
  //           image
  //           id
  //         }
  //         types {
  //           name
  //         }
  //         categories {
  //           name
  //         }
  //       }
  //     }
  //   `,
  // }

  // );
  const { loading, data, fetchMore } = useQuery(GET_ALL_NEWS_BY_TYPE_LEARN, {
    variables: { limit: 3, offset: 0 },
  });
  if (loading) return "loading...";

  return {
    props: {
      data: data,
      // fetchMore: fetchMore,
    },
  };
}
