import React, { useState } from "react";
import { Breadcrumb, Row, Col } from "antd";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Categories from "../categories/news";
import Main from "./main";
import Footer from "../../components/Layouts/footer";
import GlobalHeader from "../../components/Layouts/globalHeader";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_NEWS } from "../../graphql/query";
import FilterNews from "./filterNews";

const index = () => {
  // const [state, setState] = useState({
  //   selectedTags: ['Books']
  // })
  // const { data:news, loading:loadingNews, error } = useQuery(GET_ALL_NEWS_BY_TYPE_NEWS, {
  //   variables: { limit: 6, offset: 0 },
  //   fetchPolicy: "network-only"
  // });
  // if (loadingNews) return (<div>login...</div>)
  // if (error) return (<div>error...</div>)

  return (
    <React.Fragment>
      {/* <MainNavbar /> */}
      <GlobalHeader />
      <div className="container">
        {/* <center>
          <h1 className="top-title-allNews">News</h1>
          <Breadcrumb style={{ marginTop: "-24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>News</Breadcrumb.Item>
          </Breadcrumb>
        </center> */}
        <br></br>
        <br></br>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Main />
          </Col>
          <Col xs={24} md={8}>
            {/* <FilterNews news={news}/> */}
            <Categories/>
          </Col>  
        </Row>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default index;
