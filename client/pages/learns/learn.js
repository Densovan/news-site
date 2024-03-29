import React from "react";
import { Row, Col } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { GET_ALL_NEWS_BY_TYPE_LEARN } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";
import Link from "next/link";
import ContentLoader from "react-content-loader";

const Learn = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const { loading, data } = useQuery(GET_ALL_NEWS_BY_TYPE_LEARN, {
    variables: { limit: 8, offset: 0 },
  });
  if (loading)
    return (
      <div>
        <ContentLoader
          style={{ marginLeft: "-20px", marginTop: "75px" }}
          viewBox="0 0 400 475"
          height={350}
          width={350}
        >
          <circle cx="30" cy="258" r="30" />
          <rect x="75" y="233" rx="4" ry="4" width="100" height="13" />
          <rect x="75" y="260" rx="4" ry="4" width="50" height="8" />
          <rect x="0" y="210" rx="5" ry="5" width="400" height="10" />
          <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
        </ContentLoader>
        <ContentLoader
          style={{ marginLeft: "-20px", marginTop: "-120px" }}
          viewBox="0 0 400 475"
          height={350}
          width={350}
        >
          <circle cx="30" cy="258" r="30" />
          <rect x="75" y="233" rx="4" ry="4" width="100" height="13" />
          <rect x="75" y="260" rx="4" ry="4" width="50" height="8" />
          <rect x="0" y="210" rx="5" ry="5" width="400" height="10" />
          <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
        </ContentLoader>
        <ContentLoader
          style={{ marginLeft: "-20px", marginTop: "-120px" }}
          viewBox="0 0 400 475"
          height={350}
          width={350}
        >
          <circle cx="30" cy="258" r="30" />
          <rect x="75" y="233" rx="4" ry="4" width="100" height="13" />
          <rect x="75" y="260" rx="4" ry="4" width="50" height="8" />
          <rect x="0" y="210" rx="5" ry="5" width="400" height="10" />
          <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
        </ContentLoader>
      </div>
    );

  return (
    <React.Fragment>
      <br></br>
      <h1 className="top-title">Learn</h1>

      <div>
        <Row gutter={[12, 12]}>
          {data.get_all_news_by_type_learn.slice(0, 4).map((res, index) => {
            const result = <Output data={JSON.parse(res.des)} />;
            return (
              <Col key={index} sm={8} md={8} lg={24}>
                <div className="content-top-stories">
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

                        {/* <h1 className="status-news-topstory">
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
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
      <br></br>
      <h3 className="all-learn-btn">
        <Link href="/learns">
          <a>
            All Learn <span>&rarr;</span>
          </a>
        </Link>
      </h3>
    </React.Fragment>
  );
};

export default Learn;
