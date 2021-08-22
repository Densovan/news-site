// import React, { useState } from "react";
// import { Breadcrumb, Row, Col } from "antd";
// // import MainNavbar from "../../components/Layouts/mainNavbar";
// // import Categories from "../categories/news";
// import FilterNews from "./filterNews";
// import Main from "./main";
// import Footer from "../../components/Layouts/footer";
// import GlobalHeader from "../../components/Layouts/globalHeader";

// const index = ({ data, fetchMore, userData, vote_up_down, get_all_vote }) => {
//   const [state, setState] = useState({
//     selectedTags: ["All"],
//     loading: false,
//   });

//   const handleChange = (tag, checked) => {
//     const { selectedTags } = state;
//     const nextSelectedTags = checked
//       ? [...selectedTags, tag]
//       : selectedTags.filter((t) => t !== tag);
//     setState({ selectedTags: nextSelectedTags, loading: true });
//     setTimeout(() => {
//       setState({ selectedTags: nextSelectedTags, loading: false });
//     }, 1000);
//   };

//   return (
//     <React.Fragment>
//       <GlobalHeader />
//       <div className="container">
//         {/* <center>
//           <h1 className="top-title-allNews">News</h1>
//           <Breadcrumb style={{ marginTop: "-24px" }}>
//             <Breadcrumb.Item>Home</Breadcrumb.Item>
//             <Breadcrumb.Item>News</Breadcrumb.Item>
//           </Breadcrumb>
//         </center> */}
//         <br></br>
//         <Row gutter={[16, 16]}>
//           <Col xs={24} md={16}>
//             <Main
//               data={data}
//               vote_up_down={vote_up_down}
//               userData={userData}
//               fetchMore={fetchMore}
//               selectedTags={state.selectedTags}
//               loadingFilter={state.loading}
//               get_all_vote={get_all_vote}
//             />
//           </Col>
//           <Col xs={24} md={8}>
//             <FilterNews
//               handleChange={handleChange}
//               selectedTags={state.selectedTags}
//             />
//           </Col>
//         </Row>
//       </div>
//       <Footer />
//     </React.Fragment>
//   );
// };

// export default index;

import React, { useState } from "react";
import { Breadcrumb, Row, Col } from "antd";
// import MainNavbar from "../../components/Layouts/mainNavbar";
// import Categories from "../categories/news";
import FilterNews from "./filterNews";
import Main from "./main";
import Footer from "../../components/Layouts/footer";
import GlobalHeader from "../../components/Layouts/globalHeader";

const index = ({ data, fetchMore, userData, vote_up_down, get_all_vote }) => {
  const [state, setState] = useState({
    selectedTags: ["All"],
    loading: false,
  });

  const handleChange = (tag, checked) => {
    const { selectedTags } = state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setState({ selectedTags: nextSelectedTags, loading: true });
    setTimeout(() => {
      setState({ selectedTags: nextSelectedTags, loading: false });
    }, 1000);
  };

  return (
    <React.Fragment>
      <GlobalHeader />
      <div className="container">
        {/* <center>
          <h1 className="top-title-allNews">News</h1>
          <Breadcrumb style={{ marginTop: "-24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>News</Breadcrumb.Item>
          </Breadcrumb>
        </center> */}
        <br></br>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Main
              data={data}
              vote_up_down={vote_up_down}
              get_all_vote={get_all_vote}
              userData={userData}
              fetchMore={fetchMore}
              selectedTags={state.selectedTags}
              loadingFilter={state.loading}
              get_all_vote={get_all_vote}
            />
          </Col>
          <Col xs={24} md={8}>
            <FilterNews
              handleChange={handleChange}
              selectedTags={state.selectedTags}
            />
          </Col>
        </Row>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default index;
