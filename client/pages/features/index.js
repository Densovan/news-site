import React from "react";
import { Col, Row } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_FEATURE } from "../../graphql/query";
import Link from "next/link";
import moment from "moment";
import Output from "editorjs-react-renderer";

const Learn = () => {
  const { loading, data } = useQuery(GET_ALL_NEWS_BY_TYPE_FEATURE, {
    variables: { limit: 6, offset: 0 },
  });
  if (loading) return null;
  console.log(data);
  return (
    <React.Fragment>
      <TopNavbar />
      <MainNavbar />
      <div className="container top-learns">
        <center>
          <h1 className="about-main-title">Feature</h1>
        </center>
        <Row gutter={[12, 12]}>
          {data.get_allnews_by_type.map((res) => {
            const result = <Output data={JSON.parse(res.des)} />;
            return (
              <Col sm={24} md={12} lg={8}>
                <div className="learn-card">
                  <div
                    className="learn-style"
                    style={{
                      backgroundImage: `url("http://localhost:3500/public/uploads//${res.thumnail}")`,
                    }}
                  ></div>
                  <div className="content-learn">
                    <h3>
                      {" "}
                      {res.title.length <= 50
                        ? res.title
                        : res.title.substring(0, 50) + " ..."}
                    </h3>
                    <p>
                      {`${result.props.data.blocks[0].data.text.substring(
                        0,
                        50
                      )}...`}
                    </p>
                    <h1 className="status-news-topstory">
                      {res.types.name}
                      <span>
                        <CaretRightOutlined style={{ fontSize: "10px" }} />
                      </span>{" "}
                      {res.categories.name}
                    </h1>
                    <p className="date-learn ">
                      {" "}
                      {res.user.fullname} :{" "}
                      {moment.unix(res.createdAt / 1000).format("DD-MM-YYYY")}
                    </p>
                    {/* <button className="readmore-learn">
                      Read More <span>&rarr;</span>
                    </button> */}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Learn;
