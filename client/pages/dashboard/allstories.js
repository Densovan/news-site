// import React, { useContext } from "react";
// import { Table, Tag, Divider, Popconfirm, message } from "antd";
// import { useQuery, useMutation } from "@apollo/client";
// import { GET_OWN_NEWS } from "../../graphql/query";
// import { DELETE_NEWS } from "../../graphql/mutation";
// import { BsTrash, BsPencil } from "react-icons/bs";
// import MainNavbar from "../../components/Layouts/mainNavbar";
// import Footer from "../../components/Layouts/footer";
// import AuthContext from "../../contexts/authContext";

// import Link from "next/link";
// import GlobalHeader from "../../components/Layouts/globalHeader";
// import Profile from "./profile";

// const Allstory = () => {
//   const server = process.env.API_SECRET;
//   const server_local = process.env.API_SECRET_LOCAL;
//   const develop = process.env.NODE_ENV;
//   const URL_ACCESS = develop === "development" ? server_local : server;

//   const { loggedIn } = useContext(AuthContext);
//   const [delete_news] = useMutation(DELETE_NEWS);
//   const { loading, data, error, refetch } = useQuery(GET_OWN_NEWS);
//   if (loading) return null;
//   if (error) return `Error! ${error.message}`;
//   const columns = [
//     {
//       title: "Thumnail",
//       width: 100,
//       dataIndex: "thumnail",
//       key: () => Math.random().toString(),
//       render: (data) => {
//         return (
//           <img
//             height="40px"
//             width="40px"
//             src={`${URL_ACCESS}/public/uploads//` + data}
//             // src={"https://backend.beecolony.org/public/uploads/" + data}
//             alt="avatar"
//           ></img>
//         );
//       },
//     },
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: () => Math.random().toString(),
//       render: (data) => {
//         return data.length <= 25 ? data : data.substring(0, 25) + " ...";
//       },
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: () => Math.random().toString(),
//       render: (index, data) => {
//         const { id, title, categories, types, thumnail, des } = data;
//         return (
//           <div>
//             <Link href={`/dashboard/editstory/${id}`}>
//               <Tag className="edit-button">
//                 <BsPencil
//                   color="rgb(32, 166, 147)"
//                   size="15px"
//                   style={{ marginTop: "6px" }}
//                 />
//               </Tag>
//             </Link>
//             <Divider type="vertical" />
//             <Popconfirm
//               placement="topRight"
//               title="Are you sure to delete?"
//               okText="Yes"
//               cancelText="No"
//               onConfirm={() => {
//                 delete_news({ variables: { id: `${id}` } })
//                   .then(async (res) => {
//                     await message.success(res.data.delete_news.message);
//                     await refetch();
//                   })
//                   .catch((error) => {
//                     console.log(error);
//                     return null;
//                   });
//               }}
//             >
//               <Tag className="delete-button">
//                 <BsTrash
//                   color="#ff5858"
//                   size="15px"
//                   style={{ marginTop: "6px" }}
//                 />
//               </Tag>
//             </Popconfirm>
//           </div>
//         );
//       },
//     },
//   ];
//   return (
//     <React.Fragment>
//       {/* <MainNavbar /> */}
//       {/* <GlobalHeader /> */}
//       <Profile />
//       {loggedIn === true && (
//         <div className="container">
//           <div className="profile-content">
//             <div className="sub-pf-content">
//               <h2>Your Stories</h2>
//               <Table
//                 // key={data.get_own_news.id}
//                 rowKey={(record) => record.id}
//                 columns={columns}
//                 dataSource={data.get_own_news}
//                 // onChange={onChange}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//       <br></br>
//       {loggedIn === false && window.location.replace("/")}
//       <Footer />
//     </React.Fragment>
//   );
// };

// export default Allstory;

import React, { useState, Fragment, useContext } from "react";
import {
  Row,
  Col,
  Layout,
  Spin,
  Card,
  Avatar,
  Tooltip,
  Result,
  Input,
} from "antd";
import parse from "html-react-parser";
import { CaretRightOutlined } from "@ant-design/icons";
import { AiOutlinePicture, AiOutlineLink } from "react-icons/ai";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import {
  GET_OWN_NEWS,
  // GET_USER,
  GET_VOTE_UP_DOWN,
  GET_ALL_VOTE_UP_DOWN,
} from "../../graphql/query";
import moment from "moment";
import Medium from "../../components/loaders/newsLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallNavbar from "../../components/Layouts/smallNavbar";
import AuthContext from "../../contexts/authContext";
import NewLike from "../../components/common/news.like";
import Profile from "./profile";
import Footer from "../../components/Layouts/footer";

const { Content } = Layout;

const AllNews = ({ selectedTags, loadingFilter }) => {
  const { loggedIn } = useContext(AuthContext);
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const [hasMoreItems, setHasMoreItems] = useState(true);
  //=============get last News===========
  const {
    loading,
    data: news,
    fetchMore,
    refetch,
  } = useQuery(GET_OWN_NEWS, {
    variables: { limit: 6, offset: 0 },
    pollInterval: 500,
  });
  // const { loading: userLoading, data: userData } = useQuery(GET_USER);
  const { data: vote_up_down, loading: vote_up_down_loading } =
    useQuery(GET_VOTE_UP_DOWN);
  const { data: get_all_vote, loading: loading_all_vote } = useQuery(
    GET_ALL_VOTE_UP_DOWN,
    {
      pollInterval: 500,
    }
  );
  if (loading || vote_up_down_loading || loading_all_vote)
    return (
      <div className="container">
        <Medium />
      </div>
    );
  // console.log(news);
  // const result = [];
  // if (!loadingFilter) {
  //   if (selectedTags.length === 0) {
  //     news.get_all_news.map((news) => {
  //       result.push(news);
  //     });
  //   } else {
  //     let selectedTag = [];
  //     selectedTags.forEach((element) => {
  //       if (element === "All") {
  //         selectedTag.push(element);
  //       }
  //     });
  //     if (selectedTag[0] == "All") {
  //       news.get_all_news.map((news) => {
  //         result.push(news);
  //       });
  //     } else {
  //       news.get_all_news.filter((news) => {
  //         return selectedTags.map((selectedTag) => {
  //           if (
  //             news.categories.name === selectedTag ||
  //             news.types.name === selectedTag
  //           ) {
  //             result.push(news);
  //           }
  //         });
  //       });
  //     }
  //   }
  // }
  return (
    <React.Fragment>
      <Profile />

      <div className="container">
        <Row>
          <Col span={16}>
            {news.get_own_news.map((res, index) => {
              return (
                <div>
                  <Card
                    // extra={
                    //   <a className="te" href="#">
                    //     More
                    //   </a>
                    // }
                    // style={{ padding: "-10px" }}
                    className="card-article"
                    key={index}
                  >
                    {/* <h1 className="te">hello</h1> */}
                    <Row gutter={[8, 8]}>
                      <Col xs={24} md={16} className="box-news">
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
                          <div className="header-card-article">
                            <Avatar src={res.user.image} />

                            <div className="profile-name-time">
                              <Tooltip
                                placement="right"
                                title={
                                  <div style={{ padding: 8 }}>
                                    <div className="header-card-article">
                                      <Avatar src={res.user.image} />
                                      <div
                                        className="card-name"
                                        style={{ marginLeft: 4 }}
                                      >
                                        {res.user.fullname}
                                      </div>
                                    </div>
                                    <div style={{ paddingTop: 4 }}>
                                      {res.user.bio}
                                    </div>
                                  </div>
                                }
                                className="card-name"
                              >
                                <li style={{ cursor: "pointer" }}>
                                  {res.user.fullname}
                                </li>
                              </Tooltip>
                              <li className="news-name">
                                {moment
                                  .unix(res.createdAt / 1000)
                                  .format("DD-MM-YYYY")}
                              </li>
                            </div>
                          </div>
                        </Link>
                        <div className="news-content">
                          <div className="title-text-card">
                            {res.title.length <= 50
                              ? res.title
                              : res.title.substring(0, 50) + " ..."}
                          </div>
                          <div className="text-content-card">
                            {parse(
                              res.des.length <= 70
                                ? res.des
                                : res.des.substring(0, 70) + "..."
                            )}
                          </div>
                        </div>
                        <div className="news-footer">
                          <div>
                            <button className="type-category">
                              {res.types.name}
                              <span>
                                <CaretRightOutlined
                                  style={{ fontSize: "10px" }}
                                />
                              </span>{" "}
                              {res.categories.name}
                            </button>
                            <Link href={`/detail/${res.slug}`}>
                              <button className="readmore">
                                Read More <span>&rarr;</span>
                              </button>
                            </Link>
                          </div>
                          {/* <NewLike
                            postId={res.id}
                            ownerId={res.user.id}
                            voteCount={res.voteCount}
                            vote_up_down={vote_up_down}
                            get_all_vote={get_all_vote}
                            refetch={refetch}
                          /> */}
                        </div>
                      </Col>
                      <Col xs={24} md={8}>
                        <div
                          className="image-news-style"
                          style={{
                            backgroundImage: `url(${URL_ACCESS}/public/uploads//${res.thumnail})`,
                          }}
                        >
                          {/* <img
                        height="100%"
                        width="200"
                        src={`${URL_ACCESS}/public/uploads//${res.thumnail}`}
                      /> */}
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </div>
              );
            })}
            <InfiniteScroll
              dataLength={news.get_own_news.length}
              next={async () => {
                await fetchMore({
                  variables: {
                    offset: news.get_own_news.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    if (fetchMoreResult.get_own_news.length < 6) {
                      setHasMoreItems(false);
                    }

                    return Object.assign({}, prev, {
                      get_own_news: [
                        ...prev.get_own_news,
                        ...fetchMoreResult.get_own_news,
                      ],
                    });
                  },
                });
              }}
              hasMore={hasMoreItems}
              loader={
                <Content style={{ marginTop: "15px" }}>
                  <center>
                    <Spin></Spin>
                  </center>
                </Content>
              }
              endMessage={null}
            ></InfiniteScroll>
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default AllNews;
