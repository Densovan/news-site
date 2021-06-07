import React from "react";
import { useRouter } from "next/router";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { GET_NEWS_LEARN_BY_CAT } from "../../graphql/query";
import { Col, Row } from "antd";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";
import Categories from "../categories/learn";
import Link from "next/link";
import { CaretRightOutlined } from "@ant-design/icons";
import { CubeSpinner } from "react-spinners-kit";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, data } = useQuery(GET_NEWS_LEARN_BY_CAT, {
    variables: { id, limit: 8, offset: 0 },
  });
  if (loading)
    return (
      <center style={{ marginTop: "100px" }}>
        <CubeSpinner size={30} backColor="#686769" frontColor="#fce24a" />
      </center>
    );
  // console.log(data);
  return (
    <React.Fragment>
      <TopNavbar />
      <MainNavbar />
      <div className="container top-learns">
        <center>
          <h1 className="about-main-title">Learn</h1>
        </center>
        <Row gutter={[32, 32]}>
          <Col sm={24} md={6}>
            <Categories />
          </Col>
          <Col sm={24} md={18}>
            <Row gutter={[12, 12]}>
              {data.get_allnews_type_by_cat.map((res) => {
                const result = <Output data={JSON.parse(res.des)} />;
                return (
                  <Col sm={24} md={12} lg={8}>
                    <Link href={`/detail/${res.slug}`}>
                      <div className="learn-card">
                        <div
                          className="learn-style"
                          style={{
                            backgroundImage: `url("http://localhost:3500/public/uploads//${res.thumnail}")`,
                          }}
                        ></div>
                        <div className="content-learn">
                          <h3>
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
                          <Row>
                            <Col xs={24} md={16}>
                              <h1 className="status-news-topstory">
                                {res.types.name}
                                <span>
                                  <CaretRightOutlined
                                    style={{ fontSize: "10px" }}
                                  />
                                </span>{" "}
                                {res.categories.name}
                              </h1>
                              <p className="date-learn ">
                                {res.user.fullname} :{" "}
                                {moment
                                  .unix(res.createdAt / 1000)
                                  .format("DD-MM-YYYY")}
                              </p>
                            </Col>
                            <Col xs={24} md={8}></Col>
                          </Row>
                        </div>
                      </div>
                    </Link>
                  </Col>
                );
              })}
            </Row>
            {data.get_allnews_type_by_cat == "" && (
              <center>
                <h1>No Result</h1>
              </center>
            )}
          </Col>
        </Row>
      </div>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Index;
