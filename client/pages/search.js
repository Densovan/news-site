import React from "react";
import { useRouter } from "next/router";
import News from "../components/newsSearch/index";
import { useQuery } from "@apollo/client";
import { GET_NEWS_SEARCH, GET_USER, GET_VOTE_UP_DOWN } from "../graphql/query";
import Medium from "../components/loaders/newsLoader";
import CategoryLoader from "../components/loaders/categoryLoader";
import { Row, Col } from "antd";

const search = () => {
  const { query } = useRouter();

  const { loading, data, fetchMore } = useQuery(GET_NEWS_SEARCH, {
    variables: { search: query.keyword },
  });
  const { loading: userLoading, data: userData } = useQuery(GET_USER);
  const { data: vote_up_down, loading: vote_up_down_loading } =
    useQuery(GET_VOTE_UP_DOWN);
  if (loading || !data || userLoading || vote_up_down_loading) {
    return (
      <div className="container">
        <br></br>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Medium />
          </Col>
          <Col xs={24} md={8}>
            <CategoryLoader />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div>
      <News
        data={data}
        fetchMore={fetchMore}
        userData={userData}
        vote_up_down={vote_up_down}
      />
    </div>
  );
};

export default search;