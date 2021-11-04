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
import { UPDATE_USER } from "../../graphql/mutation";
import { GET_USER } from "../../graphql/query";
import Footer from "../../components/Layouts/footer";
import { useAuth } from "../../layouts/layoutAuth";
import ImgCrop from "antd-img-crop";

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
  const { isAuthenticated, user } = useAuth();

  //=========== update Userdata ============
  const [update_user] = useMutation(UPDATE_USER);
  const { refetch } = useQuery(GET_USER);

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
        variables: { ...user, image: info.file.response.data },
      }).then(() => {
        message.success("Profile Image Changed Successful");
        refetch();
        setState({ loading: false });
      });
    }
  };
  const onFinish = (values) => {
    console.log("click");
    setIsLoading(true);
    update_user({
      variables: {
        // ...data.get_user,
        ...user,
        ...values,
      },
    }).then(async (res) => {
      setIsLoading(false);
      await message.success(res.data.update_user.message, 2);
      window.location.replace("/dashboard/profile");
      // if (res.data.update_user.message === "The password is invalid!") {
      //   message.error(res.data.update_user.message);
      // } else if (
      //   res.data.update_user.message === "The password does not match!"
      // ) {
      //   message.error(res.data.update_user.message);
      // } else {
      //   await message.success(res.data.update_user.message, 2);
      //   window.location.replace("/dashboard/profile");
      // }
    });
  };
  // console.log(user);

  return (
    <React.Fragment>
      <br></br>
      {isAuthenticated && (
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
                        src={user && user.user.get_user.image}
                        alt={user && user.user.get_user.fullname}
                        className="profile-img"
                        style={{ cursor: "auto" }}
                      />
                      <center className="laoding-pf">
                        <LoadingOutlined className="icon-loading" />
                      </center>
                    </div>
                  ) : (
                    <img
                      src={user && user.user.get_user.image}
                      alt={user && user.user.get_user.fullname}
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
                        onChange={handleChange}
                        onPreview={onPreview}
                      >
                        <div className="editUserPhotoAvatar">
                          <FiCamera style={{ fontSize: "20px" }} />
                        </div>
                      </Upload>
                    </ImgCrop>
                  </div>
                </div>
              </center>
              <Divider orientation="left" plain>
                <h3>Information</h3>
              </Divider>
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  initialValue={user && user.user.get_user.fullname}
                  name="fullname"
                  label="FullName"
                >
                  <Input
                    defaultValue={user && user.user.get_user.fullname}
                    className="input-pf"
                    size="large"
                    placeholder="Fullname"
                  />
                </Form.Item>
                <Form.Item
                  initialValue={user && user.user.get_user.bio}
                  name="bio"
                  label="Bio"
                >
                  <Input
                    defaultValue={user && user.user.get_user.bio}
                    className="input-pf"
                    size="large"
                    placeholder="Bio"
                  />
                </Form.Item>
                <Form.Item
                  initialValue={user && user.user.get_user.gender}
                  name="gender"
                  label={
                    <label style={{ color: "white", fontWeight: "900" }}>
                      Gender
                    </label>
                  }
                >
                  <Radio.Group defaultValue={user && user.user.get_user.bio}>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button
                    className="btn-submit"
                    disabled={isLoading ? true : false}
                    loading={isLoading ? true : false}
                    htmlType="submit"
                    size="large"
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
      {!isAuthenticated && window.location.replace("/")}
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default ChangeProfilePicture;
