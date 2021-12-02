import React, { useState, useContext } from "react";
import { Form, Button, Input, Upload, message, Select, Row, Col } from "antd";
import { GET_CATEGORIES, GET_TYPES, GET_OWN_NEWS } from "../../graphql/query";
import { ADD_NEWS, LOGIN_NEW } from "../../graphql/mutation";
import { useQuery, useMutation } from "@apollo/client";
import dynamic from "next/dynamic";
import Footer from "../../components/Layouts/footer";
import { useAuth } from "../../layouts/layoutAuth";
import { useRouter } from "next/router";
import QuillNoSSRWrapper from "../../components/Quill/textEditor";

const EditorJs = dynamic(
  () =>
    import("../../components/Editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

const Addstory = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;
  const [new_login] = useMutation(LOGIN_NEW);
  const { isAuthenticated, user } = useAuth();
  const [editor, setEditor] = useState(null);
  const [title, setTitle] = useState("");
  const [des, setDescr] = useState("");
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
  // async function handleSave() {
  //   const savedData = await instanceRef.current.save();
  //   console.log(JSON.stringify(savedData));
  //   await setData(savedData);
  //   // instanceRef.current.clear();
  // }

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
  const handleDescChange = (values) => {
    console.log(values);
    setDescr(values);
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
    // const saveDescription = await editor.save();
    add_news({
      variables: {
        ...values,
        // des: JSON.stringify(des),
        des: des,
        thumnail: state.imageUrl,
        // des: JSON.stringify(saveDescription),
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
        // await refetch();
        setLoading(false);
        router.push("/dashboard/allstories");
        console.log("success", values, des);
        // window.location.replace("/dashboard/allstories");
      } else if (res.data.add_news.status == 400) {
        await message.warning(res.data.add_news.message);
        setLoading(false);
      }
    });
    console.log(values);
    console.log(des);
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
      <br></br>
      {isAuthenticated && (
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
                      placeholder="Enter Title..."
                    />
                  </Form.Item>
                  <Form.Item
                    placeholder="Tell Your Story"
                    name="des"
                    onChange={onChange2}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Tell your story!",
                    //   },
                    // ]}
                  >
                    {/* {CustomEditor && (
                      <CustomEditor
                        // tools={EDITOR_JS_TOOLS}
                        placeholder="Tell your story"
                        instanceRef={(instance) =>
                          (instanceRef.current = instance)
                        }
                      />
                    )} */}
                    <QuillNoSSRWrapper
                      handleDescChange={handleDescChange}
                      defaultValue={des}
                    />
                    {/* <EditorJs
                    reInit
                    editorRef={setEditor}
                    placeholder="Tell your story"
                  /> */}
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
                          action={`${URL_ACCESS}/upload/images`}
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                        >
                          {state.imageUrl ? (
                            <img
                              src={
                                `${URL_ACCESS}/public/uploads/` + state.imageUrl
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
                      disabled={title === ""}
                      // type="primary"
                      onClick={() => next()}
                    >
                      Next
                    </Button>
                  )}
                  {current === 1 && (
                    <Form.Item>
                      <Button
                        // onClick={handleSave}
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
                    <Button className="btn-pre" onClick={() => prev()}>
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
      {!isAuthenticated && window.location.replace("/")}
      <Footer />
    </React.Fragment>
  );
};

export default Addstory;
