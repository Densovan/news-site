import { useQuery, useSubscription } from "@apollo/client";
import React from "react";
import { GET_CHAT } from "../graphql/query";

const test = () => {
  const { loading, data } = useSubscription(GET_CHAT);
  if (loading) return "loading...";
  console.log(data.get_chats);
  return (
    <div>
      {data.get_chats.map((res) => (
        <div>{res.body}</div>
      ))}
    </div>
  );
};

export default test;
