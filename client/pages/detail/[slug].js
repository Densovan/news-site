import React from "react";
import { useRouter } from "next/router";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { GET_NEWS_BY_SLUG } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import Output from "editorjs-react-renderer";
import moment from "moment";
import { Row, Col } from "antd";
import { CubeSpinner } from "react-spinners-kit";
import ContentLoader from "react-content-loader";

const SinglePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, data } = useQuery(GET_NEWS_BY_SLUG, {
    variables: { slug },
  });
  if (loading)
    return (
      <center style={{ marginTop: "100px" }}>
        <CubeSpinner size={30} backColor="#686769" frontColor="#fce24a" />
        {/* <ContentLoader
          width={450}
          height={400}
          viewBox="0 0 450 400"
          backgroundColor="#f0f0f0"
          foregroundColor="#dedede"
          // {...props}
        >
          <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
          <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
          <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
        </ContentLoader> */}
      </center>
    );
  console.log(data);
  const { title, thumnail, des, user, createdAt } = data.get_news_by_slug;
  const result = <Output data={JSON.parse(des)} />;
  return (
    <React.Fragment>
      <TopNavbar />
      <MainNavbar />
      <div className="container">
        <br></br>
        <Row gutter={[32, 32]}>
          <Col sm={24} md={24} lg={17}>
            <div className="detail">
              <div className="detail-main-des">
                <h1>{title}</h1>
                <Row gutter={[12, 12]}>
                  <Col span={20}>
                    <div>
                      <span>By : </span>
                      <span>
                        <b>{user.fullname}</b>
                      </span>
                    </div>
                    {/* <span> </span> */}
                  </Col>
                  <Col span={4}>
                    <div className="badge-date">
                      {moment.unix(createdAt / 1000).format("DD-MM-YYYY")}
                    </div>
                  </Col>
                </Row>
              </div>
              <img
                style={{ maxWidth: "100%", marginTop: "12px" }}
                src={"http://localhost:3500/public/uploads/" + thumnail}
              />
              <div className="detail-des">
                <p>{result}</p>
              </div>
            </div>
          </Col>
          <Col sm={24} md={24} lg={7}></Col>
        </Row>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default SinglePage;
