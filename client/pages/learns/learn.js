import React from "react";
import { Row, Col, Button, Divider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { GET_ALL_NEWS_BY_TYPE_LEARN } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";
import Link from "next/link";

const Learn = () => {
  const { loading, data } = useQuery(GET_ALL_NEWS_BY_TYPE_LEARN, {
    variables: { limit: 8, offset: 0 },
  });
  if (loading) return null;
  return (
    <React.Fragment>
      <br></br>
      <h1 className="top-title">Learn</h1>
      <div>
        <Row gutter={[12, 12]}>
          {data.get_allnews_by_type.slice(0, 4).map((res) => {
            const result = <Output data={JSON.parse(res.des)} />;
            return (
              <Col span={24}>
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
                        <Col xs={24} md={8}>
                          {/* <button className="readmore-learn">
                          Read More <span>&rarr;</span>
                        </button> */}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
          {/* <h3 className="all-learn-btn">
            <Link href="/learns">
              <a>
                All Learn <span>&rarr;</span>
              </a>
            </Link>
          </h3> */}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Learn;
