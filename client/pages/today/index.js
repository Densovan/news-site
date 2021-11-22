import React, { useState } from "react";
import { Row, Col, Avatar, Input } from "antd";
import FilterNews from "../news/filterNews";
import Main from "./main";
import Footer from "../../components/Layouts/footer";
import { useAuth } from "../../layouts/layoutAuth";
import Link from "next/link";
import FilterNavbar from "../../components/Layouts/filterNavbar";
import Filter from "../../components/globals/Filter";
import Suggestion from "../../components/globals/Suggestion";
import Content from "../../components/globals/Content";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_TODAY } from "../../graphql/query";

const index = () => {
  const [state, setState] = useState({
    selectedTags: ["All"],
    loading: false,
  });

  const { isAuthenticated, user } = useAuth();
  const { data:news, loading: loadingNews, refetch} = useQuery(GET_ALL_NEWS_TODAY);
  const handleChange = (tag, checked) => {
    const { selectedTags } = state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setState({ selectedTags: nextSelectedTags, loading: true });
    setTimeout(() => {
      setState({ selectedTags: nextSelectedTags, loading: false });
    }, 1000);
  };

  return (
    <React.Fragment>
      {/* <div className="container">
        <br></br>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Filter 
              handleChange={handleChange}
              selectedTags={state.selectedTags}
            />
            <Suggestion user={user} isAuthenticated={isAuthenticated}/>
          </Col>
          <Col xs={24} md={16}>
            {isAuthenticated === true && (
              <Row className="status-style">
                <Col span={2}>
                  <center>
                    <Avatar
                      style={{
                        height: 35,
                        width: 35,
                        cursor: "pointer",
                        border: "solid 2px #ffffff9d",
                      }}
                      src={user && user.user.get_user.image}
                      shape="circle"
                    />
                  </center>
                </Col>
                <Col span={22}>
                  <Link href="/dashboard/addstory">
                    <Input size="middle" placeholder="Write your story" />
                  </Link>
                </Col>
              </Row>
            )}
            <FilterNavbar />
            <Content
              selectedTags={state.selectedTags}
              loadingFilter={state.loading}
              news={news != null && news.get_all_news_today}
              loadingNews={loadingNews}
              refetch={refetch}
            />
          </Col>
        </Row>
      </div>
      <Footer /> */}
       <Content
          selectedTags={state.selectedTags}
          loadingFilter={state.loading}
          news={news != null && news.get_all_news_today}
          loadingNews={loadingNews}
          refetch={refetch}
        />
    </React.Fragment>
  );
};

export default index;
