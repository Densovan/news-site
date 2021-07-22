import React, { useState, useContext } from "react";
import { Form, Button, Input, Upload, message, Select, Col, Row } from "antd";
import {
  GET_NEWS,
  GET_OWN_NEWS,
  GET_CATEGORIES,
  GET_TYPES,
} from "../../../graphql/query";
import { useRouter } from "next/router";
import { EDIT_NEWS } from "../../../graphql/mutation";
import { useQuery, useMutation } from "@apollo/client";
import dynamic from "next/dynamic";
import MainNavbar from "../../../components/Layouts/mainNavbar";
import AuthContext from "../../../contexts/authContext";
import Footer from "../../../components/Layouts/footer";
let CustomEditor;
let EDITOR_JS_TOOLS;
if (typeof window !== "undefined") {
  CustomEditor = dynamic(() => import("react-editor-js"));
  EDITOR_JS_TOOLS = dynamic(() => import("../../../components/Layouts/tools"));
}

const Editstory = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const router = useRouter();
  const [current, setCurrent] = React.useState(0);
  const [titles, setTitle] = useState("");
  const { loggedIn } = useContext(AuthContext);
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = React.useState({
    time: 1556098174501,
    blocks: [
      {
        type: "header",
        data: {
          text: "Editor.js",
          level: 2,
        },
      },
    ],
  });
  const [form] = Form.useForm();
  const instanceRef = React.useRef(null);
  const { id } = router.query;
  const { loading: LoadingNews, data: dataNews } = useQuery(GET_NEWS, {
    variables: { id },
  });
  const [edit_news] = useMutation(EDIT_NEWS);
  const { refetch } = useQuery(GET_OWN_NEWS);

  if (LoadingNews) return "loading...";
  console.log(dataNews);
  const onChange1 = (e) => {
    setTitle(e.target.value);
  };

  async function handleSave() {
    const savedData = await instanceRef.current.save();
    console.log(JSON.stringify(savedData));
    await setData(savedData);
    // instanceRef.current.clear();
  }
  const next = (e) => {
    // e.preventDefault();
    setCurrent(current + 1);
  };

  const prev = (e) => {
    // e.preventDefault();
    setCurrent(current - 1);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      setState({
        imageUrl: info.file.response.data,
        loading: false,
      });
    }
  };

  const uploadButton = (
    <div>
      {/* {state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div className="ant-upload-text">
        <img src="/assets/images/addfile.svg" alt="img" />
      </div>
    </div>
  );
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const onChange = (e) => {
    // console.log(e);
  };
  const { title, thumnail, des, user, createdAt, category, type } =
    dataNews.get_news;

  // ==================Get Category ID===================
  const GetCategory = () => {
    const {
      loading: catLoading,
      data: catData,
      error: catError,
    } = useQuery(GET_CATEGORIES);
    if (catLoading) return null;
    console.log("get", des);
    if (catError) return `Error! ${error.message}`;
    return (
      <Form.Item label="Category" name="category" initialValue={category}>
        <Select
          defaultValue={category}
          size="large"
          // className="input-pf"
          showSearch
          // style={{ width: 200 }}
          placeholder="Select Category"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {catData.get_cats.map((res) => {
            return (
              <Option value={res.id} key={res.id}>
                {res.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    );
  };

  // ==================Get Type ID===================
  const GetType = () => {
    const {
      loading: typeLoading,
      data: typeData,
      error: typeError,
    } = useQuery(GET_TYPES);
    if (typeLoading) return null;
    if (typeError) return `Error! ${error.message}`;
    return (
      <Form.Item label="Type" name="type" initialValue={type}>
        <Select
          size="large"
          defaultValue={type}
          // className="input-pf"
          showSearch
          // style={{ width: 200 }}
          placeholder="Select Type"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {typeData.get_types.map((res) => {
            return (
              <Option value={res.id} key={res.id}>
                {res.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    );
  };

  const onFinish = async (values) => {
    edit_news({
      variables: {
        id: id,
        ...values,
        des: JSON.stringify(data),
        thumnail: state.imageUrl === null ? thumnail : state.imageUrl,
      },
    }).then(async (res) => {
      setLoading(true);
      await refetch();
      await message.success("update successful");
      router.push("/dashboard/allstories");
      // await window.location.replace("/dashboard/allstories");
    });
  };

  return (
    <React.Fragment>
      {/* <MainNavbar /> */}
      <GlobalHeader />
      <br></br>
      {loggedIn === true && (
        <div className="container">
          <div className="profile-content">
            <div className="sub-pf-content">
              <h2>Edit Your Story</h2>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <div className={current === 1 && "hidden"}>
                  <Form.Item
                    onChange={onChange1}
                    initialValue={title}
                    label="Title"
                    name="title"
                  >
                    <Input
                      defaultValue={title}
                      className="input-pf"
                      size="large"
                      placeholder="title"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name="des"
                    initialValue={JSON.parse(des)}
                  >
                    {CustomEditor && (
                      <CustomEditor
                        data={JSON.parse(des)}
                        tools={EDITOR_JS_TOOLS}
                        placeholder="Please Input Description"
                        instanceRef={(instance) =>
                          (instanceRef.current = instance)
                        }
                      />
                    )}
                  </Form.Item>
                </div>
                <div className={current === 0 && "hidden"}>
                  <Row gutter={[32, 32]}>
                    <Col span={12}>
                      <Form.Item
                        label="Thumnail"
                        name="image"
                        initialValue={thumnail}
                      >
                        <Upload.Dragger
                          name="file"
                          className="avatar-uploader"
                          action={`${URL_ACCESS}/upload/images`}
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                        >
                          {state.imageUrl === null ? (
                            <img
                              // src={
                              //   "https://backend.beecolony.org/public/uploads/" +
                              //   thumnail
                              // }
                              src={`${URL_ACCESS}/public/uploads/` + thumnail}
                              alt="avatar"
                              style={{ width: "100%" }}
                            />
                          ) : (
                            <img
                              src={
                                `${URL_ACCESS}/public/uploads/` + state.imageUrl
                              }
                              alt="avatar"
                              style={{ width: "100%" }}
                            />
                          )}
                        </Upload.Dragger>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <GetCategory />
                      <GetType />
                    </Col>
                  </Row>
                </div>
                <div className="steps-action">
                  {current === 0 && (
                    <Button
                      className="btn-next"
                      disabled={titles.length < 1}
                      // type="primary"
                      onClick={() => next()}
                    >
                      Next
                    </Button>
                  )}
                  {current === 1 && (
                    <Form.Item>
                      <Button
                        onClick={handleSave}
                        className="btn-submit"
                        disabled={loading ? true : false}
                        loading={loading ? true : false}
                        // type="primary"
                        htmlType="submit"
                        size="large"
                        // className="standard-btn"
                      >
                        {loading ? (
                          <small>loading...</small>
                        ) : (
                          <small>SUMBIT</small>
                        )}
                      </Button>
                    </Form.Item>
                  )}
                  {current > 0 && (
                    <Button className="btn-next" onClick={() => prev()}>
                      Previous
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
      {loggedIn === false && window.location.replace("/")}
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Editstory;
