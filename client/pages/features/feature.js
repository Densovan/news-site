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
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const { loading, data } = useQuery(GET_ALL_NEWS_BY_TYPE_FEATURE, {
    variables: { limit: 6, offset: 0 },
  });
  if (loading) return <Laoder />;

  return (
    <React.Fragment>
      <div className="feature-div">
        <h1 className="top-title">Feature</h1>
        <Row gutter={[12, 12]}>
          {data.get_all_news_by_type_feature.slice(0, 6).map((res, index) => {
            const result = <Output data={JSON.parse(res.des)} />;
            return (
              <Col
                key={index}
                className="content-top-stories"
                sm={24}
                md={12}
                lg={8}
              >
                <Link href={`/detail/${res.slug}`}>
                  <div className="learn-card">
                    <div
                      className="learn-style"
                      style={{
                        backgroundImage: `url(${URL_ACCESS}/public/uploads//${res.thumnail})`,
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
