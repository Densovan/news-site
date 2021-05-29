import React, { useState } from "react";
import { Form, Button, Input, Upload, message, Select } from "antd";
import { GET_CATEGORIES, GET_TYPES, GET_OWN_NEWS } from "../../graphql/query";
import { ADD_NEWS } from "../../graphql/mutation";
import { useQuery, useMutation } from "@apollo/client";
import dynamic from "next/dynamic";
// import { EDITOR_JS_TOOLS } from "../../components/Layouts/tools";
let CustomEditor;
let EDITOR_JS_TOOLS;
if (typeof window !== "undefined") {
  CustomEditor = dynamic(() => import("react-editor-js"));
  EDITOR_JS_TOOLS = dynamic(() => import("../../components/Layouts/tools"));
}

const Addstory = () => {
  const instanceRef = React.useRef(null);
  const [add_news] = useMutation(ADD_NEWS);
  const { refetch } = useQuery(GET_OWN_NEWS);
  const [form] = Form.useForm();
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
  async function handleSave() {
    const savedData = await instanceRef.current.save();
    console.log(JSON.stringify(savedData));
    await setData(savedData);
    // instanceRef.current.clear();
  }

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
    add_news({
      variables: {
        ...values,
        des: JSON.stringify(data),
        thumnail: state.imageUrl,
      },
    }).then(async (res) => {
      setLoading(true);
      await message.success("Created successfull");
      form.resetFields();
      setState({
        imageUrl: null,
        loading: false,
      });
      await refetch();
      setLoading(false);
    });
    // console.log(values);
  };

  return (
    <React.Fragment>
      <div className="sub-pf-content">
        <h2>Add Your Story</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
              action="http://localhost:3500/upload/images"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {state.imageUrl ? (
                <img
                  // src={`${`https://backend.vitaminair.org/`}/public/uploads/${
                  //   state.imageUrl
                  // }`}
                  src={"http://localhost:3500/public/uploads/" + state.imageUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload.Dragger>
          </Form.Item>

          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input className="input-pf" size="large" placeholder="title" />
          </Form.Item>

          <GetCategory />
          <GetType />

          <Form.Item
            label="Description"
            name="des"
            rules={[
              {
                required: true,
                message: "Please input Description!",
              },
            ]}
          >
            {CustomEditor && (
              <CustomEditor
                tools={EDITOR_JS_TOOLS}
                placeholder="Please Input Description"
                instanceRef={(instance) => (instanceRef.current = instance)}
              />
            )}
            {/* <EditorJs
              tools={EDITOR_JS_TOOLS}
              placeholder="Please input Description"
              instanceRef={(instance) => (instanceRef.current = instance)}
            /> */}
          </Form.Item>
          <Form.Item>
            <Button
              onClick={handleSave}
              className="btn-submit"
              disabled={loading ? true : false}
              loading={loading ? true : false}
              htmlType="submit"
              size="large"
            >
              {loading ? <small>loading...</small> : <small>SUMBIT</small>}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default Addstory;
