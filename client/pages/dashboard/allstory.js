import React from "react";
import { Col, Row } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { GET_OWN_NEWS } from "../../graphql/query";
import { CaretRightOutlined } from "@ant-design/icons";
import Output from "editorjs-react-renderer";
import Link from "next/link";

const Allstory = () => {
  const { loading, data, error, refetch } = useQuery(GET_OWN_NEWS);
  if (loading) return null;
  console.log("hello", data);
  if (error) return `Error! ${error.message}`;
  return (
    <React.Fragment>
      <div className="sub-pf-content">
        <h2>Your Storiess</h2>

        <Row gutter={[12, 12]}>
          {data.get_own_news.map((res) => {
            const result = <Output data={JSON.parse(res.des)} />;
            return (
              <Col sm={24} md={8}>
                <Link href="/">
                  <div className="learn-card">
                    <div
                      className="image-own-pf"
                      style={{
                        backgroundImage: `url("http://localhost:3500/public/uploads//${res.thumnail}")`,
                      }}
                    ></div>
                    <div className="content-news-pf">
                      <h4>
                        {res.title.length <= 25
                          ? res.title
                          : res.title.substring(0, 25) + " ..."}
                      </h4>
                      <p className="text-content-pf">
                        {`${result.props.data.blocks[0].data.text.substring(
                          0,
                          50
                        )}...`}
                        {/* <Output data={JSON.parse(res.des)} /> */}
                      </p>
                      <Row>
                        <Col xs={24} md={16}>
                          <h1 className="status-news-pf">
                            {res.types.name}
                            <span>
                              <CaretRightOutlined
                                style={{ fontSize: "10px" }}
                              />
                            </span>{" "}
                            {res.categories.name}
                          </h1>
                          <p className="date-learn ">
                            {res.user.fullname} : 03/03/2021
                          </p>
                        </Col>
                        <Col xs={24} md={8}>
                          {/* <button className="readmore-learn">
                          ReadMore<span>&rarr;</span>
                        </button> */}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Allstory;
