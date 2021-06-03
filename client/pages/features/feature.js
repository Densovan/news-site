import React from "react";
import { Row, Col } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { GET_ALL_NEWS_BY_TYPE_FEATURE } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";

const Feature = () => {
  const { loading, data } = useQuery(GET_ALL_NEWS_BY_TYPE_FEATURE, {
    variables: { limit: 6, offset: 0 },
  });
  if (loading) return null;

  return (
    <React.Fragment>
      <br></br>

      <h1 className="top-title">Feature</h1>

      <div>
        <Row gutter={[12, 12]}>
          {data.get_allnews_by_type.slice(0, 6).map((res) => {
            const result = <Output data={JSON.parse(res.des)} />;
            return (
              <Col sm={24} md={8}>
                <div className="learn-card">
                  <div
                    className="learn-style"
                    style={{
                      backgroundImage: `url("http://localhost:3500/public/uploads//${res.thumnail}")`,
                    }}
                  ></div>
                  <div className="content-learn">
                    <h3>
                      {res.title.length <= 20
                        ? res.title
                        : res.title.substring(0, 20) + " ..."}
                    </h3>
                    <p>
                      {`${result.props.data.blocks[0].data.text.substring(
                        0,
                        50
                      )}...`}
                    </p>
                    <Row>
                      <Col xs={24} md={18}>
                        <h1 className="status-news-topstory">
                          {res.types.name}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
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
                      <Col xs={24} md={6}>
                        {/* <button className="readmore-learn">
                          Read More <span>&rarr;</span>
                        </button> */}
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <br></br>
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
