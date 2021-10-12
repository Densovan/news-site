import React, { useState, useContext } from "react";
import {
  Upload,
  message,
  Divider,
  Form,
  Input,
  Row,
  Col,
  Button,
  Radio,
} from "antd";
import { FiCamera } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/query";
import { UPDATE_USER } from "../../graphql/mutation";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import AuthContext from "../../contexts/authContext";
import ImgCrop from "antd-img-crop";
import GlobalHeader from "../../components/Layouts/globalHeader";

const ChangeProfilePicture = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  //======state for chagte profile image
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { loggedIn } = useContext(AuthContext);

  //===========update Userdata============
  const [update_user] = useMutation(UPDATE_USER);
  //===========get data form graphql===============
  const { loading, data, refetch } = useQuery(GET_USER);
  if (loading) return "";

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);

    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
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
  // const { fullname } = data.get_user;
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
        window.location.replace("/dashboard/profile");
      }
    });
  };

  return (
    <React.Fragment>
      {/* <MainNavbar /> */}
      <GlobalHeader />
      <br></br>
      {loggedIn && (
        <div className="container">
          <div className="profile-content">
            <div className="addstory-content">
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
                    <ImgCrop grid={true} rotate>
                      <Upload
                        name="file"
                        showUploadList={false}
                        action={`${URL_ACCESS}/upload/profile`}
                        // beforeUpload={beforeUpload}
                        onChange={handleChange}
                        onPreview={onPreview}
                      >
                        <div className="editUserPhotoAvatar">
                          <FiCamera style={{ fontSize: "20px" }} />
                        </div>
                      </Upload>
                    </ImgCrop>
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
                    // defaultValue={data.get_user.fullname}
                    className="input-pf"
                    size="large"
                    placeholder="Fullname"
                  />
                </Form.Item>
                <Form.Item
                  initialValue={data.get_user.bio}
                  name="bio"
                  label="Bio"
                >
                  <Input
                    defaultValue={data.get_user.bio}
                    className="input-pf"
                    size="large"
                    placeholder="Bio"
                  />
                </Form.Item>
                <Form.Item
                  initialValue={data.get_user.gender}
                  name="gender"
                  label={
                    <label style={{ color: "white", fontWeight: "900" }}>
                      Gender
                    </label>
                  }
                >
                  <Radio.Group
                    // onChange={onChange}
                    defaultValue={data.get_user.bio}
                  >
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </Radio.Group>
                </Form.Item>
                {/* <Divider orientation="left" plain>
                  <h3>Password</h3>
                </Divider>
                <Form.Item name="passwordHash" label="Old Password">
                  <Input.Password
                    className="input-pf"
                    size="large"
                    placeholder="Old Password"
                  />
                </Form.Item> */}
                {/* <Row gutter={[12, 12]}>
                  <Col sm={24} md={12}>
                    <Form.Item name="newPassword" label="New Password">
                      <Input.Password
                        className="input-pf"
                        size="large"
                        placeholder="New Password"
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={12}>
                    <Form.Item name="confirmPassword" label="Confirm Password">
                      <Input.Password
                        className="input-pf"
                        size="large"
                        placeholder="Confirm Password"
                      />
                    </Form.Item>
                  </Col>
                </Row> */}
                <Form.Item>
                  <Button
                    className="btn-submit"
                    disabled={isLoading ? true : false}
                    loading={isLoading ? true : false}
                    // type="primary"
                    htmlType="submit"
                    size="large"
                    // className="standard-btn"
                  >
                    {isLoading ? (
                      <small>loading...</small>
                    ) : (
                      <small>SUMBIT</small>
                    )}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      )}
      {!loggedIn && window.location.replace("/")}
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default ChangeProfilePicture;
