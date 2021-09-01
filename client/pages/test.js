import { useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_CHAT, GET_CHAT_S } from "../graphql/query";

const test = () => {
  const { loading, data, subscribeToMore } = useQuery(GET_CHAT);
  useEffect(() => {
    subscribeToMore({
      document: GET_CHAT_S,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newChat = subscriptionData.data.newChat;
        console.log(newChat);
        const updateNewChatList = Object.assign({}, prev, {
          chats: [...prev.chats, newChat],
        });

        return updateNewChatList;
      },
    });
  }, []);
  // if (!loading) {
  //   console.log(data);
  // }
  // console.log(data);
  return (
    <div>
      hello
      {/* {data.get_chats.map((res) => (
        <div>{res.body}</div>
      ))} */}
    </div>
  );
};

export default test;
