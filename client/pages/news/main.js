import React from "react";
import { Row, Col, Divider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS_BY_TYPE_NEWS } from "../../graphql/query";
import moment from "moment";
import Output from "editorjs-react-renderer";
import Loader from "../../components/loaders/laoder";

const AllNews = () => {
  //=============get last News===========
  const { loading, data } = useQuery(GET_ALL_NEWS_BY_TYPE_NEWS, {
    variables: { limit: 8, offset: 0 },
  });
  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <React.Fragment>
      {data.get_allnews_by_type.map((res) => {
        const result = <Output data={JSON.parse(res.des)} />;
        return (
          <div className="content-top-stories">
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={24} md={8} lg={9}>
                <div
                  className="news-topstory-style"
                  style={{
                    backgroundImage: `url("https://backend.beecolony.org/public/uploads//${res.thumnail}")`,
                  }}
                ></div>
              </Col>
              <Col xs={24} sm={24} md={16} lg={15}>
                <h2 className="title-news">
                  {res.title.length <= 70
                    ? res.title
                    : res.title.substring(0, 70) + " ..."}
                </h2>
                <p className="describe-style">
                  {`${result.props.data.blocks[0].data.text.substring(
                    0,
                    120
                  )}...`}
                </p>
                <Row>
                  <Col xs={17} md={18}>
                    {/* <h1 className="status-news-topstory">
                          {res.types.name}
                          <span>
                            <CaretRightOutlined style={{ fontSize: "10px" }} />
                          </span>{" "}
                          {res.categories.name}
                        </h1>
                        <p className="date-news">
                          {res.user.fullname}:{" "}
                          {moment
                            .unix(res.createdAt / 1000)
                            .format("DD-MM-YYYY")}
                        </p> */}
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
                          <img className="avatar-mobile" src={res.user.image} />
                        </Link>
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
                  </Col>
                  <Col xs={7} md={6}>
                    <Link href={`/detail/${res.slug}`}>
                      <button className="readmore">
                        Read More <span>&rarr;</span>
                      </button>
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Divider
                style={{ marginTop: "0px", marginBottom: "10px" }}
              ></Divider>
            </Row>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default AllNews;
