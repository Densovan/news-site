import React, { useContext } from "react";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import Footer from "../../components/Layouts/footer";
import { GET_NEWS_BY_SLUG, GET_USER, GET_FOLLOWS } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { Col, Row, Divider } from "antd";
import Laoder from "../../components/loaders/detailLoader";
import Follow from "../../components/common/follow";
import { useAuth } from "../../layouts/layoutAuth";
import Link from "next/link";
import FormSave from "../../components/common/save";

import { HiOutlineShare, HiOutlineBookmark } from "react-icons/hi";

import FormComment from "../../components/common/comment";
import CommentList from "../../components/commentList";

const SinglePage = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const { loading, data, refetch } = useQuery(GET_NEWS_BY_SLUG, {
    variables: { slug },
    pollInterval: 1000,
  });
  const { data: follows, loading: follow_loading } = useQuery(GET_FOLLOWS, {
    pollInterval: 1000,
  });
  const { loading: userLoadin, data: myUser } = useQuery(GET_USER);

  if (loading || userLoadin || follow_loading)
    return (
      <div className="container">
        <center style={{ marginTop: "100px" }}>
          <Laoder />
        </center>
      </div>
    );
  const {
    id,
    title,
    thumnail,
    des,
    user,
    createdAt,
    comment,
    reply,
    like,
    category,
    type,
    save,
  } = data.get_news_by_slug;
  return (
    <React.Fragment>
      <div className="container">
        <div style={{ marginTop: 40 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={2}>
              {isAuthenticated && (
                <div className="nav_left">
                  <Row gutter={[32, 32]}>
                    <Col xs={8} md={24}>
                      {/* <FormLike
                        articleId={id}
                        dataLike={like}
                        myUser={myUser}
                        ownPostuserId={user.id}
                      /> */}
                    </Col>
                    <Col xs={8} md={24}>
                      <div className="btn_box">
                        <button
                          style={{ cursor: "pointer" }}
                          className="share-bg"
                        >
                          <HiOutlineShare className="share" size={23} />
                        </button>
                        <div className="tt_share">31</div>
                      </div>
                    </Col>
                    <Col xs={8} md={24}>
                      <div className="btn_box">
                        {/* <button
                          style={{ cursor: "pointer" }}
                          className="save-bg"
                        >
                          <HiOutlineBookmark className="save" size={23} />
                        </button> */}
                        <FormSave
                          news_id={id}
                          title={title}
                          des={des}
                          category={category}
                          type={type}
                          slug={slug}
                          myUser={myUser}
                          createBy={user.accountId}
                          thumnail={thumnail}
                          save={save}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                // <div>
                //   <center style={{ marginTop: "23px" }}>
                //     <div className="nav_left">
                //       <Row gutter={[32, 32]}>
                //         <Col span={8}>
                //           <FormLike
                //             articleId={id}
                //             dataLike={like}
                //             myUser={myUser}
                //             ownPostuserId={user.id}
                //           />
                //         </Col>
                //         <Col span={8}>
                //           <div className="btn_box">
                //             <button
                //               style={{ cursor: "pointer" }}
                //               className="share-bg"
                //             >
                //               <HiOutlineShare className="share" size={23} />
                //             </button>
                //             <div className="tt_share">31</div>
                //           </div>
                //         </Col>
                //         <Col span={8}>
                //           {" "}
                //           <div className="btn_box">
                //             <button
                //               style={{ cursor: "pointer" }}
                //               className="save-bg"
                //             >
                //               <HiOutlineBookmark className="save" size={23} />
                //             </button>
                //             <div className="tt_share">1</div>
                //           </div>
                //         </Col>
                //       </Row>
                //     </div>
                //   </center>
                // </div>
              )}
            </Col>
            <Col xs={24} md={16}>
              <div>
                <div className="arcticle-div">
                  {/* <div className="thumail">
                  <img src={`${URL_ACCESS}/public/uploads/` + thumnail} />
                </div> */}
                  <div
                    className="thumail-article"
                    style={{
                      backgroundImage: `url(${URL_ACCESS}/public/uploads//${thumnail})`,
                    }}
                  ></div>
                </div>
                {/* <center style={{ marginTop: "23px" }}>
                  {loggedIn === true && (
                    <div className="nav_left-mobile">
                      <Row gutter={[32, 32]}>
                        <Col span={8}>
                          <FormLike
                            articleId={id}
                            dataLike={like}
                            myUser={myUser}
                            ownPostuserId={user.id}
                          />
                        </Col>
                        <Col span={8}>
                          <div className="btn_box">
                            <button
                              style={{ cursor: "pointer" }}
                              className="share-bg"
                            >
                              <HiOutlineShare className="share" size={23} />
                            </button>
                            <div className="tt_share">31</div>
                          </div>
                        </Col>
                        <Col span={8}>
                          {" "}
                          <div className="btn_box">
                            <button
                              style={{ cursor: "pointer" }}
                              className="save-bg"
                            >
                              <HiOutlineBookmark className="save" size={23} />
                            </button>
                            <div className="tt_share">1</div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                </center> */}
                <div className="article_title">
                  <h1>{title}</h1>
                </div>

                <div>
                  <Link
                    href={`/profile_detial/${user.accountId}#${user.fullname
                      .replace(
                        /[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g,
                        "-"
                      )
                      .toLowerCase()}`}
                  >
                    <div style={{ cursor: "pointer" }} className="pf_user">
                      <img src={user.image} />

                      <div className="name">
                        <label>{user.fullname}</label>
                        <div className="time">
                          <label>
                            {moment.unix(createdAt / 1000).format("DD-MM-YYYY")}{" "}
                            · 3 min read
                          </label>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div style={{ color: "#262e3c", marginBottom: 20 }}>
                    {/* <p className="describe-style-article">{result}</p> */}
                    <div className="describe-style-article">{parse(des)}</div>
                  </div>
                  <Divider />
                  {isAuthenticated ? (
                    <div style={{ marginTop: 20 }}>
                      <h3>Comment({reply.length + comment.length})</h3>
                      <div>
                        <FormComment
                          user={user}
                          articleId={id}
                          // ownerId={user.id}
                          ownerId={user.accountId}
                        />
                        <CommentList
                          articleId={id}
                          comments={comment}
                          reply={reply}
                          fullname={user.fullname}
                          ownerId={user.accountId}
                          // ownerId={user.id}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <center>
                        <br></br>
                        <h3>
                          Please <Link href="/signin">Login</Link> to Make
                          Discussion
                        </h3>
                        <img
                          style={{ maxWidth: "50%" }}
                          src="/assets/images/Login-rafiki.png"
                        />
                      </center>
                      {/* <FormComment user={user} articleId={id} myUser={myUser} />
                      <CommentList
                        articleId={id}
                        comments={comment}
                        reply={reply}
                        fullname={user.fullname}
                      /> */}
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="pf_pre">
                <Link
                  href={`/profile_detial/${user.accountId}#${user.fullname
                    .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, "-")
                    .toLowerCase()}`}
                >
                  <div style={{ cursor: "pointer" }} className="pf_user">
                    <img src={user.image} />
                    <div className="name">
                      <label>{user.fullname}</label>
                      <p>{user.email}</p>
                    </div>
                  </div>
                </Link>
                <div className="pf_desc">
                  <center>
                    <p>{user.bio}</p>
                  </center>
                </div>
                {isAuthenticated ? (
                  <center>
                    {user.id === myUser.get_user.id ? (
                      <center>
                        <Link href="/dashboard/profile">
                          <button className="btn-follow">My Account</button>
                        </Link>
                      </center>
                    ) : (
                      <Follow
                        articleUser={user}
                        follows={follows}
                        user={myUser}
                      />
                    )}
                  </center>
                ) : (
                  // <center>
                  //   <Link href="/signin">
                  //     <button className="btn-follow">Follow</button>
                  //   </Link>
                  // </center>
                  ""
                )}

                <div className="pf-work">
                  {/* ======work======= */}
                  <div>
                    <Divider
                      orientation="left"
                      style={{ fontSize: "18", color: "gray" }}
                    >
                      Work
                    </Divider>
                    <h4>Community Lead at DSC JSS </h4>
                  </div>
                  {/* ===========Location============ */}
                  <div>
                    <Divider
                      style={{ fontSize: "18", color: "gray" }}
                      orientation="left"
                    >
                      Location
                    </Divider>
                    <h4>Noida, Uttar Pradesh, India </h4>
                  </div>
                  {/*========= Education=========== */}
                  <div>
                    <Divider
                      style={{ fontSize: "18", color: "gray" }}
                      orientation="left"
                    >
                      Education
                    </Divider>
                    <h4>JSS Academy Of Technical Education Noida </h4>
                  </div>
                  {/* //===========join============== */}
                  <div>
                    <Divider
                      style={{ fontSize: "18", color: "gray" }}
                      orientation="left"
                    >
                      Join
                    </Divider>
                    <h4>{moment.unix(user.createdAt / 1000).format("LL")}</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default SinglePage;
