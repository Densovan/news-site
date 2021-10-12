import React, { useState, useRef, useEffect } from "react";
import UseTable from "../../src/components/useTable";
import {
  Tag,
  Space,
  Button,
  Avatar,
  Tooltip,
  Typography,
  Form,
  Row,
  Col,
  Input,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphql/queries";
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
} from "../../graphql/mutation";
import Pupop from "../../src/components/Popup";
const Category = () => {
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState([]);
  const formRef = React.createRef();
  const [form] = Form.useForm();

  const [addCategory] = useMutation(ADD_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const [editCategory] = useMutation(EDIT_CATEGORY);

  const {
    data: categories,
    loading: loading_category,
    error: error_category,
  } = useQuery(GET_CATEGORIES, {
    fetchPolicy: "network-only",
    pollInterval: 1000,
  });

  if (loading_category) return <div>Loading...</div>;
  if (error_category) return <div>Error</div>;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "TITLE",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "NAME",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            style={{ background: "#94d0cc", color: "#fff" }}
            shape="circle"
            icon={<EditOutlined />}
            size="middle"
            onClick={() => {
              setEdit(record),
                setVisible(true),
                form.setFieldsValue({
                  name: record.name,
                });
            }}
          />
          <Button
            style={{ background: "#fb3640", color: "#fff" }}
            shape="circle"
            icon={<DeleteOutlined />}
            size="middle"
            onClick={async () => {
              try {
                deleteCategory({
                  variables: {
                    id: record.objectId,
                  },
                });
              } catch (e) {
                throw e;
              }
            }}
          />
        </Space>
      ),
    },
  ];
  const onFinish = async (values) => {
    try {
      if (edit != null) {
        await editCategory({
          variables: { id: edit.objectId, name: values.name },
        }).then(async (response) => {
          form.resetFields();
          message.success("Category update success");
          setVisible(false);
        });
      } else {
        await addCategory({ variables: { name: values.name } }).then(
          async (response) => {
            form.resetFields();
            message.success("Category add success");
            setVisible(false);
          }
        );
      }
    } catch {
      console.log("Sorry for have problem");
    }
  };
  const data = [];
  let i = 1;
  categories.get_categories.forEach((element) => {
    data.push({
      key: i,
      id: i,
      name: element.name,
      fullname: element.user.fullname,
      objectId: element.id,
    });
    i++;
  });
  return (
    <div>
      <div
        className="title"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 20,
        }}
      >
        <Typography.Title level={5}>Catetory</Typography.Title>
        <Button
          onClick={() => {
            setVisible(true), form.resetFields(), setEdit(null);
          }}
        >
          Add Category
        </Button>
      </div>
      <Pupop
        visible={visible}
        setVisible={setVisible}
        form={form}
        title="Category"
      >
        <Form
          layout="vertical"
          form={form}
          size="large"
          ref={formRef}
          onFinish={onFinish}
        >
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter category name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Pupop>
      <UseTable columns={columns} data={data} />
    </div>
  );
};

export default Category;
