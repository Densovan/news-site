import React from "react";
import { useRouter } from "next/router";
import News from "../components/newsSearch/index";
import { useQuery } from "@apollo/client";
import { GET_NEWS_SEARCH, GET_USER } from "../graphql/query";
import Medium from "../components/loaders/newsLoader";
import CategoryLoader from "../components/loaders/categoryLoader";
import { Row, Col } from "antd";

const search = () => {
  const { query } = useRouter();

  const { loading, data, fetchMore } = useQuery(GET_NEWS_SEARCH, {
    variables: { search: query.keyword },
  });
  const { loading: userLoading, data: userData } = useQuery(GET_USER);

  if (loading || !data || userLoading) {
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
  console.log(data);
  return (
    <div>
      <News data={data} fetchMore={fetchMore} userData={userData} />
    </div>
  );
};

export default search;
