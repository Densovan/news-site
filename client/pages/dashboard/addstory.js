import React, { useState, useContext } from "react";
import { Form, Button, Input, Upload, message, Select, Row, Col } from "antd";
import { GET_CATEGORIES, GET_TYPES, GET_OWN_NEWS } from "../../graphql/query";
import { ADD_NEWS } from "../../graphql/mutation";
import { useQuery, useMutation } from "@apollo/client";
import dynamic from "next/dynamic";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import AuthContext from "../../contexts/authContext";
import { useRouter } from "next/router";
// const { EDITOR_JS_TOOLS } = require("../../components/Layouts/tools");
// window = {};
let CustomEditor;
let EDITOR_JS_TOOLS;
if (typeof window !== "undefined") {
  CustomEditor = dynamic(() => import("react-editor-js"));

  // EDITOR_JS_TOOLS = dynamic(() => import("../../components/Layouts/tools"));
  // const { EDITOR_JS_TOOLS } = dynamic(
  //   () => import("../../components/Layouts/tools"),
  //   {
  //     ssr: false,
  //   }
  // );
}

const Addstory = () => {
  const [title, setTitle] = useState("");
  const [des, setDescr] = useState("");
  const { loggedIn } = useContext(AuthContext);
  const instanceRef = React.useRef(null);
  const [add_news] = useMutation(ADD_NEWS);
  const { refetch } = useQuery(GET_OWN_NEWS);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });
  const router = useRouter();
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
  const [current, setCurrent] = React.useState(0);
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
    // setTitle(e.target.value);
    console.log(e);
  };
  const onChange1 = (e) => {
    setTitle(e.target.value);
  };
  const onChange2 = (e) => {
    setDescr(e.target.value);
  };

  // ==================Get Category ID===================
  const GetCategory = () => {
    const {
      loading: catLoading,
      data: catData,
      error: catError,
    } = useQuery(GET_CATEGORIES);
    if (catLoading) return null;
    console.log(catData);
    if (catError) return `Error! ${error.message}`;
    return (
      <Form.Item
        rules={[{ required: true, message: "Please input Categories" }]}
        label="Category"
        name="category"
      >
        <Select
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
      <Form.Item
        rules={[{ required: true, message: "Please input type" }]}
        label="Type"
        name="type"
      >
        <Select
          size="large"
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
    // vpreventDefault();
    add_news({
      variables: {
        ...values,
        des: JSON.stringify(data),
        thumnail: state.imageUrl,
      },
    }).then(async (res) => {
      setLoading(true);
      if (res.data.add_news.status == 200) {
        await message.success(res.data.add_news.message);
        form.resetFields();
        setState({
          imageUrl: null,
          loading: false,
        });
        await refetch();
        setLoading(false);
        router.push("/dashboard/allstories");
        // window.location.replace("/dashboard/allstories");
      } else if (res.data.add_news.status == 400) {
        await message.warning(res.data.add_news.message);
        setLoading(false);
      }
    });
    console.log(values);
  };

  const steps = [
    {
      title: "First",
      content: "",
    },
    {
      title: "Second",
      content: "",
    },
  ];

  return (
    <React.Fragment>
      <MainNavbar />
      <br></br>
      {loggedIn === true && (
        <div className="container">
          <div className="profile-content">
            <div className="addstory-content">
              <h2>Add Your Story</h2>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                {/* {current === 0 && ( */}
                <div className={current === 1 && "hidden"}>
                  <Form.Item
                    // label="Title"
                    name="title"
                    onChange={onChange1}

                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please input your title!",
                    //   },
                    // ]}
                  >
                    <Input
                      value={title}
                      className="input-story"
                      size="large"
                      placeholder="Title"
                    />
                  </Form.Item>
                  <Form.Item
                    placeholder="Tell Your Story"
                    name="des"
                    rules={[
                      {
                        required: true,
                        message: "Tell your story!",
                      },
                    ]}
                  >
                    {CustomEditor && (
                      <CustomEditor
                        tools={EDITOR_JS_TOOLS}
                        placeholder="Tell your story"
                        instanceRef={(instance) =>
                          (instanceRef.current = instance)
                        }
                      />
                    )}
                  </Form.Item>
                </div>
                {/* )} */}
                {/* {current === 1 && ( */}
                <div className={current === 0 && "hidden"}>
                  {" "}
                  <Row gutter={[32, 32]}>
                    <Col span={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input Image!",
                          },
                        ]}
                        label="Thumnail"
                        name="image"
                      >
                        <Upload.Dragger
                          name="file"
                          className="avatar-uploader"
                          action="https://backend.beecolony.org/upload/images"
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                        >
                          {state.imageUrl ? (
                            <img
                              // src={`${`https://backend.vitaminair.org/`}/public/uploads/${
                              //   state.imageUrl
                              // }`}
                              src={
                                "https://backend.beecolony.org/public/uploads/" +
                                state.imageUrl
                              }
                              alt="avatar"
                              style={{ width: "100%" }}
                            />
                          ) : (
                            uploadButton
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
                {/* )} */}
                <div className="steps-action">
                  {current === 0 && (
                    <Button
                      className="btn-next"
                      disabled={title.length < 1}
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
                        htmlType="submit"
                        size="large"
                      >
                        {loading ? (
                          <small>loading...</small>
                        ) : (
                          <small>PUBLISH</small>
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
      <br></br>
      {loggedIn === false && window.location.replace("/")}
      <Footer />
    </React.Fragment>
  );
};

export default Addstory;
