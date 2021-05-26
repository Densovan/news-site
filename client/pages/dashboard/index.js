import React, { useContext, useState } from "react";
import { Row, Col, Table, Tag, Divider, Popconfirm, message } from "antd";
import AuthContext from "../../contexts/authContext";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_NEWS } from "../../graphql/mutation";
import { GET_USER, GET_OWN_NEWS } from "../../graphql/query";
import { AiOutlineAppstoreAdd, AiOutlineEdit } from "react-icons/ai";
import Editstory from "./editstory";
import Addstory from "./addstory";
import { BsTrash, BsPencil } from "react-icons/bs";
// import Allstory from "./allstory";

const Dashboard = ({ value }) => {
  const [change, setChange] = useState({
    value: "all-story",
  });
  const [id, setId] = useState("");
  const [title, setTitile] = useState("");
  const [des, setDes] = useState("");
  const [category, setCategories] = useState("");
  const [type, setTypes] = useState("");
  const [thumnail, setThumnail] = useState("");

  const { loading, data } = useQuery(GET_USER);
  if (loading) return "";
  const { loggedIn } = useContext(AuthContext);

  const Allstory = () => {
    const [delete_news] = useMutation(DELETE_NEWS);
    const {
      loading: loadingAllnews,
      data: dataAllnews,
      error: errorAllnews,
      refetch: refetchAllnews,
    } = useQuery(GET_OWN_NEWS);
    if (loadingAllnews) return null;
    if (errorAllnews) return `Error! ${error.message}`;
    const columns = [
      {
        title: "Thumnail",
        width: 100,
        dataIndex: "thumnail",
        key: () => Math.random().toString(),
        render: (data) => {
          return (
            <img
              height="40px"
              width="40px"
              src={"http://localhost:3500/public/uploads/" + data}
              alt="avatar"
            ></img>
          );
        },
      },
      {
        title: "Title",
        dataIndex: "title",
        key: () => Math.random().toString(),
        render: (data) => {
          return data.length <= 25 ? data : data.substring(0, 25) + " ...";
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: () => Math.random().toString(),
        render: (index, data) => {
          const { id, title, category, type, thumnail, des } = data;
          console.log(category);
          return (
            <div>
              <Tag
                onClick={() => {
                  setChange({ value: "edit-story" });
                  setId(id);
                  setTitile(title);
                  setCategories(category);
                  setTypes(type);
                  setThumnail(thumnail);
                  setDes(des);
                }}
                className="edit-button"
              >
                <BsPencil
                  color="rgb(32, 166, 147)"
                  size="15px"
                  style={{ marginTop: "6px" }}
                />
              </Tag>

              <Divider type="vertical" />
              <Popconfirm
                placement="topRight"
                title="Are you sure to delete?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  delete_news({ variables: { id: `${id}` } })
                    .then(async (res) => {
                      await message.success(res.data.delete_news.message);
                      await refetchAllnews();
                    })
                    .catch((error) => {
                      console.log(error);
                      return null;
                    });
                }}
              >
                <Tag className="delete-button">
                  <BsTrash
                    color="#ff5858"
                    size="15px"
                    style={{ marginTop: "6px" }}
                  />
                </Tag>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
    return (
      <React.Fragment>
        <div className="sub-pf-content">
          <h2>Your Storiess</h2>
          <Table
            // key={data.get_own_news.id}
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={dataAllnews.get_own_news}
            // onChange={onChange}
          />
        </div>
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <TopNavbar />
      <MainNavbar />
      {loggedIn === true && (
        <div className="container">
          <br></br>
          <Row gutter={[12, 12]}>
            <Col sm={24} lg={8}>
              <div className="profile-bg">
                <center>
                  <br></br>
                  <img
                    className="profile-img"
                    src="/assets/images/Den.png"
                  ></img>
                  <h1>{data.get_user.fullname}</h1>
                </center>
                <div className="container-profile">
                  <h3>Your Information</h3>
                  <div className="hold-info">
                    <h4>Fullname</h4>
                    <p>{data.get_user.fullname}</p>
                  </div>

                  <div className="hold-info">
                    <h4>Email</h4>
                    <p>{data.get_user.email}</p>
                  </div>
                  <h3>Managements</h3>
                  <div className="list-content-pf">
                    <div
                      className={
                        change.value === "all-story"
                          ? "active-list-pf"
                          : "a-list-content-pf"
                      }
                      onClick={() => setChange({ value: "all-story" })}
                      // className="a-list-content-pf"
                    >
                      <span>
                        {" "}
                        <AiOutlineAppstoreAdd
                          size={16}
                          style={{ marginRight: "10px" }}
                        />
                        All Stories
                      </span>
                    </div>
                    <div
                      className={
                        change.value === "add-story"
                          ? "active-list-pf"
                          : "a-list-content-pf"
                      }
                      onClick={() => setChange({ value: "add-story" })}
                      // className="a-list-content-pf"
                    >
                      <span>
                        {" "}
                        <AiOutlineEdit
                          size={16}
                          style={{ marginRight: "10px" }}
                        />
                        Add Story
                      </span>
                    </div>
                  </div>
                </div>
                <br></br>
              </div>
            </Col>
            <Col sm={24} lg={16}>
              <div className="profile-content">
                {change.value === "all-story" && <Allstory />}
                {change.value === "add-story" && <Addstory />}
                {change.value === "edit-story" && (
                  <Editstory
                    title={title}
                    id={id}
                    des={des}
                    thumnail={thumnail}
                    type={type}
                    category={category}
                  />
                )}
              </div>
            </Col>
          </Row>
          <br></br>
        </div>
      )}
      {loggedIn === false && window.location.replace("/")}
      <Footer />
    </React.Fragment>
  );
};

export default Dashboard;
