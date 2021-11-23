import React, { useState } from 'react';
import { Breadcrumb, Row, Col, Avatar, Input } from 'antd';
import FilterNews from './filterNews';
import Main from './main';
import Footer from '../../components/Layouts/footer';
import FilterNavbar from '../Layouts/filterNavbar';
import { useAuth } from '../../layouts/layoutAuth';
import Link from 'next/link';
import Content from '../globals/Content';
import Filter from '../globals/Filter';
import Suggestion from '../globals/Suggestion';

const index = ({ data, fetchMore, userData, vote_up_down, get_all_vote }) => {
  const [state, setState] = useState({
    selectedTags: ['All'],
    loading: false,
  });

  const { isAuthenticated, user } = useAuth();
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
      <div className="container">
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
                        cursor: 'pointer',
                        border: 'solid 2px #ffffff9d',
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
              news={data.search_news_title}
              loadingNews={state.loading}
            />
          </Col>
        </Row>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default index;
