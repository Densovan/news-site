import React from "react";
import { Row, Col } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { GET_ALL_NEWS_BY_TYPE_FEATURE } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";
import Laoder from "../../components/loaders/laoder";

const Feature = () => {
  const { loading, data } = useQuery(GET_ALL_NEWS_BY_TYPE_FEATURE, {
    variables: { limit: 6, offset: 0 },
  });
  if (loading)
    return (
      // <Row gutter={[12, 12]}>
      //   <Col sm={24} md={12} lg={8}>
      //     <ContentLoader
      //       style={{ marginLeft: "-20px", marginTop: "75px" }}
      //       viewBox="0 0 400 475"
      //       height={350}
      //       width={350}
      //     >
      //       <circle cx="30" cy="258" r="30" />
      //       <rect x="75" y="233" rx="4" ry="4" width="100" height="13" />
      //       <rect x="75" y="260" rx="4" ry="4" width="50" height="8" />
      //       <rect x="0" y="210" rx="5" ry="5" width="400" height="10" />
      //       <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
      //     </ContentLoader>
      //   </Col>
      //   <Col sm={24} md={12} lg={8}>
      //     <ContentLoader
      //       style={{ marginLeft: "-20px", marginTop: "75px" }}
      //       viewBox="0 0 400 475"
      //       height={350}
      //       width={350}
      //     >
      //       <circle cx="30" cy="258" r="30" />
      //       <rect x="75" y="233" rx="4" ry="4" width="100" height="13" />
      //       <rect x="75" y="260" rx="4" ry="4" width="50" height="8" />
      //       <rect x="0" y="210" rx="5" ry="5" width="400" height="10" />
      //       <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
      //     </ContentLoader>
      //   </Col>
      //   <Col sm={24} md={12} lg={8}>
      //     <ContentLoader
      //       style={{ marginLeft: "-20px", marginTop: "75px" }}
      //       viewBox="0 0 400 475"
      //       height={350}
      //       width={350}
      //     >
      //       <circle cx="30" cy="258" r="30" />
      //       <rect x="75" y="233" rx="4" ry="4" width="100" height="13" />
      //       <rect x="75" y="260" rx="4" ry="4" width="50" height="8" />
      //       <rect x="0" y="210" rx="5" ry="5" width="400" height="10" />
      //       <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
      //     </ContentLoader>
      //   </Col>
      // </Row>
      <Laoder />
    );

  return (
    <React.Fragment>
      <div style={{ marginTop: "-50px" }}>
        <h1 className="top-title">Feature</h1>
        <Row gutter={[12, 12]}>
          {data.get_allnews_by_type.slice(0, 6).map((res) => {
            const result = <Output data={JSON.parse(res.des)} />;
            return (
              <Col className="content-top-stories" sm={24} md={12} lg={8}>
                <Link href={`/detail/${res.slug}`}>
                  <div className="learn-card">
                    <div
                      className="learn-style"
                      style={{
                        backgroundImage: `url("http://localhost:3500/public/uploads//${res.thumnail}")`,
                      }}
                    ></div>
                    <div className="content-learn">
                      <h3 className="describe-style">
                        {res.title.length <= 20
                          ? res.title
                          : res.title.substring(0, 20) + " ..."}
                      </h3>
                      <p className="describe-style">
                        {`${result.props.data.blocks[0].data.text.substring(
                          0,
                          50
                        )}...`}
                      </p>
                      <div className="date-avatar">
                        <div className="sub-date-avatar">
                          <Link
                            href={`/profile_detial/${
                              res.user.id
                            }#${res.user.fullname
                              .replace(
                                /[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g,
                                "-"
                              )
                              .toLowerCase()}`}
                          >
                            <img
                              className="avatar-mobile"
                              src={res.user.image}
                            />
                          </Link>
                        </div>
                        <div>
                          <h1 className="status-news-topstory">
                            {res.types.name}
                            <span>
                              <CaretRightOutlined
                                style={{ fontSize: "10px" }}
                              />
                            </span>{" "}
                            {res.categories.name}
                          </h1>
                          <p className="date-news">
                            {res.user.fullname} :{" "}
                            {moment
                              .unix(res.createdAt / 1000)
                              .format("DD-MM-YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
        <br></br>
        <h3 className="all-news-btn">
          <Link href="/features">
            <a>
              All Features <span>&rarr;</span>
            </a>
          </Link>
        </h3>

        {/* <h3 className="all-feature-btn">
          <Link href="/features">
            <a>
              All Feature <span>&rarr;</span>
            </a>
          </Link>
        </h3> */}
      </div>
    </React.Fragment>
  );
};

export default Feature;
