import React from "react";
import { GET_ALL_NEWS_TOP } from "../graphql/query";
import { useQuery } from "@apollo/client";

const test = () => {
  const {
    loading,
    data: news,
    fetchMore,
    refetch,
  } = useQuery(GET_ALL_NEWS_TOP, {
    variables: { limit: 100, offset: 0 },
    pollInterval: 500,
  });
  if (loading) return "loading...";
  return (
    <div>
      {news.get_all_news_top.map((res) => {
        return (
          <div>
            <h1>{res.title}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default test;
