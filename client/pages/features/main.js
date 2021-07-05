import React from "react";
import { Col, Row, Breadcrumb } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_FEATURE } from "../../graphql/query";
import Link from "next/link";
import moment from "moment";
import Output from "editorjs-react-renderer";

import Loader from "../../components/loaders/laoder";

const main = () => {
  const { loading, data } = useQuery(GET_ALL_NEWS_BY_TYPE_FEATURE, {
    variables: { limit: 6, offset: 0 },
  });
  if (loading)
    return (
      <center>
        <Loader />
      </center>
    );
  return (
    <div>
      <Row gutter={[12, 12]}>
        {data.get_allnews_by_type.map((res) => {
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
                        <img className="avatar-mobile" src={res.user.image} />
                      </div>
                      <div>
                        <h1 className="status-news-topstory">
                          {res.types.name}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
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
    </div>
  );
};

export default main;
