import React from "react";
import { Col, Row, Breadcrumb } from "antd";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import Categories from "../categories/learn";
import Main from "./main";
import GlobalHeader from "../../components/Layouts/globalHeader";
import client from "../../libs/apollo-client";
import { gql } from "@apollo/client";

const main = ({ data, fetchMore }) => {
  return (
    <React.Fragment>
      {/* <MainNavbar /> */}
      <GlobalHeader />
      <div className="container top-learns">
        <center>
          <h1 className="top-title-allNews">Learns</h1>
          <Breadcrumb style={{ marginTop: "-24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Learns</Breadcrumb.Item>
          </Breadcrumb>
        </center>
        <br></br>
        <br></br>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={6}>
            <Categories />
          </Col>
          <Col xs={24} md={18}>
            {/* <Main data={data} /> */}
            <Main />
          </Col>
        </Row>
      </div>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default main;

// export async function getServerSideProps() {
//   const { data, fetchMore } = await client.query({
//     query: gql`
//       query Users {
//         get_all_news_by_type_learn(limit: 8, offset: 0) {
//           title
//           createdAt
//           id
//           category
//           thumnail
//           type
//           slug
//           des
//           user {
//             fullname
//             image
//             id
//           }
//           types {
//             name
//           }
//           categories {
//             name
//           }
//         }
//       }
//     `,
//   });
//   return {
//     props: {
//       data: data,
//     },
//   };
// }
