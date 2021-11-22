import React, { Fragment } from "react";
import { useRouter } from "next/router";
import News from "../components/newsSearch/index";
import { useQuery } from "@apollo/client";
import {
  GET_NEWS_SEARCH,
  GET_USER,
  GET_VOTE_UP_DOWN,
  GET_ALL_VOTE_UP_DOWN,
} from "../graphql/query";
import Medium from "../components/loaders/newsLoader";
import CategoryLoader from "../components/loaders/categoryLoader";
import { Row, Col } from "antd";
import Content from "../components/globals/Content";
import { useAuth } from '../layouts/layoutAuth';

const search = () => {
  const { query } = useRouter();

  const { data, loading, fetchMore, refetch } = useQuery(GET_NEWS_SEARCH, {
    variables: { search: query.keyword },
  });
  // if (
  //   loading ||
  //   !data ||
  //   userLoading ||
  //   vote_up_down_loading ||
  //   loading_all_vote
  // ) {
  //   return (
  //     <div className="container">
  //       <br></br>
  //       <Row gutter={[16, 16]}>
  //         <Col xs={24} md={16}>
  //           <Medium />
  //         </Col>
  //         <Col xs={24} md={8}>
  //           <CategoryLoader />
  //         </Col>
  //       </Row>
  //     </div>
  //   );
  // }
  const { selected, loadingFilter } = useAuth();
  return (
    <Fragment>
      <Content
        selectedTags={selected}
        loadingFilter={loadingFilter}
        news={data!=null && data.search_news_title}
        loadingNews={loading}
        refetch={refetch}
        fetchMore={fetchMore}
      />
    </Fragment>
  );
};

export default search;
