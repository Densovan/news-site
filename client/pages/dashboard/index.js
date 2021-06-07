import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  Table,
  Tag,
  Divider,
  Popconfirm,
  message,
  Upload,
  Button,
} from "antd";
import AuthContext from "../../contexts/authContext";
import TopNavbar from "../../components/Layouts/topNavbar";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_NEWS, UPDATE_USER } from "../../graphql/mutation";
import { GET_USER, GET_OWN_NEWS } from "../../graphql/query";
import { AiOutlineAppstoreAdd, AiOutlineEdit } from "react-icons/ai";
import Editstory from "./editstory";
import Addstory from "./addstory";
import { BsTrash, BsPencil } from "react-icons/bs";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { FiCamera, FiEdit } from "react-icons/fi";
import EditProfile from "./editProfile";

const Dashboard = ({ value }) => {
  const [change, setChange] = useState({
    value: "all-story",
  });

  //============state for set ID to change news
  const [id, setId] = useState("");
  const [title, setTitile] = useState("");
  const [des, setDes] = useState("");
  const [category, setCategories] = useState("");
  const [type, setTypes] = useState("");
  const [thumnail, setThumnail] = useState("");

  //======state for chagte profile image
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });

  const [update_user] = useMutation(UPDATE_USER);
  const { loading, data, refetch } = useQuery(GET_USER);
  if (loading) return "";
  const { loggedIn } = useContext(AuthContext);

  //==========function show table of news=============
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
          <h2>Your Stories</h2>
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

  //===== Upload File Function =====
  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setState({ loading: true });
      return;
    }
    if (info.file.status === "uploading") {
      console.log(info.file);
    }
    if (info.file.status === "done") {
      await update_user({
        variables: { ...data.get_user, image: info.file.response.data },
      }).then(() => {
        message.success("Profile Image Changed Successful");
        refetch();
        // handleCancel();
        setState({ loading: false });
      });
    }
  };

  //============return main component==================

  return (
    <React.Fragment>
      <TopNavbar />
      <MainNavbar />
      {loggedIn === true && (
        <div className="container">
          <br></br>
          <Row gutter={[12, 12]}>
            <Col xs={24} lg={8}>
              <div className="profile-bg">
                <div className="container-pf">
                  <div
                    onClick={() => {
                      setChange({ value: "edit-pf" });
                    }}
                    className="btn-edit-pf"
                  >
                    <FiEdit size={20} />
                  </div>
                  <center>
                    <br></br>
                    <div className="userPhoto">
                      {state.loading ? (
                        <div>
                          <img
                            src={data.get_user.image}
                            alt={data.get_user.fullname}
                            className="profile-img"
                            style={{ cursor: "auto" }}
                          />
                          <center className="laoding-pf">
                            <LoadingOutlined className="icon-loading" />
                          </center>
                        </div>
                      ) : (
                        <img
                          src={data.get_user.image}
                          alt={data.get_user.fullname}
                          className="profile-img"
                          style={{ cursor: "auto" }}
                        />
                      )}

                      <div className="button-upload">
                        {/* <div className="editUserPhotoAvatar"> */}
                        {/* <FiCamera style={{ fontSize: "20px" }} /> */}
                        <Upload
                          name="file"
                          // listType="picture-card"
                          // className="avatar-uploader"
                          showUploadList={false}
                          action="http://localhost:3500/upload/profile"
                          // beforeUpload={beforeUpload}
                          onChange={handleChange}
                        >
                          <div className="editUserPhotoAvatar">
                            <FiCamera style={{ fontSize: "20px" }} />
                          </div>
                        </Upload>
                        {/* </div> */}
                      </div>
                    </div>
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
              </div>
            </Col>
            <Col xs={24} lg={16}>
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
                {change.value === "edit-pf" && <EditProfile />}
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
