import React, { useState } from "react";
import { Upload, message, Divider, Form, Input, Row, Col, Button } from "antd";
import { FiCamera } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/query";
import { UPDATE_USER } from "../../graphql/mutation";

const ChangeProfilePicture = () => {
  //======state for chagte profile image
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  //===========get data form graphql===============
  const { loading, data, refetch } = useQuery(GET_USER);
  if (loading) return "";
  //===========update Userdata============
  const [update_user] = useMutation(UPDATE_USER);

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
  const { fullname } = data.get_user;
  const onFinish = (values) => {
    setIsLoading(true);
    update_user({
      variables: {
        ...data.get_user,
        ...values,
      },
    }).then(async (res) => {
      setIsLoading(false);
      if (res.data.update_user.message === "The password is invalid!") {
        message.error(res.data.update_user.message);
      } else if (
        res.data.update_user.message === "The password does not match!"
      ) {
        message.error(res.data.update_user.message);
      } else {
        await message.success(res.data.update_user.message, 2);
        window.location.reload();
      }
    });
  };

  return (
    <React.Fragment>
      <div className="sub-pf-content">
        <h2>Edit your Profile</h2>
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
              <Upload
                name="file"
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
        </center>
        <Divider orientation="left" plain>
          <h3>Information</h3>
        </Divider>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            initialValue={data.get_user.fullname}
            name="fullname"
            label="FullName"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your fullname!",
            //   },
            // ]}
          >
            <Input
              defaultValue={data.get_user.fullname}
              className="input-pf"
              size="large"
              placeholder="Fullname"
            />
          </Form.Item>
          <Divider orientation="left" plain>
            <h3>Password</h3>
          </Divider>
          <Form.Item name="passwordHash" label="Old Password">
            <Input
              className="input-pf"
              size="large"
              placeholder="Old Password"
            />
          </Form.Item>
          <Row gutter={[12, 12]}>
            <Col sm={24} md={12}>
              <Form.Item name="newPassword" label="New Password">
                <Input
                  className="input-pf"
                  size="large"
                  placeholder="New Password"
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item name="confirmPassword" label="Confirm Password">
                <Input
                  className="input-pf"
                  size="large"
                  placeholder="Confirm Password"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              className="btn-submit"
              disabled={loading ? true : false}
              loading={loading ? true : false}
              // type="primary"
              htmlType="submit"
              size="large"
              // className="standard-btn"
            >
              {loading ? <small>loading...</small> : <small>SUMBIT</small>}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default ChangeProfilePicture;
