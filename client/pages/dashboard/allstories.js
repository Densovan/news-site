import React, { useContext } from "react";
import { Table, Tag, Divider, Popconfirm, message } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { GET_OWN_NEWS } from "../../graphql/query";
import { DELETE_NEWS } from "../../graphql/mutation";
import { BsTrash, BsPencil } from "react-icons/bs";
import MainNavbar from "../../components/Layouts/mainNavbar";
import Footer from "../../components/Layouts/footer";
import AuthContext from "../../contexts/authContext";

import Link from "next/link";

const Allstory = () => {
  const { loggedIn } = useContext(AuthContext);
  const [delete_news] = useMutation(DELETE_NEWS);
  const { loading, data, error, refetch } = useQuery(GET_OWN_NEWS);
  if (loading) return null;
  if (error) return `Error! ${error.message}`;
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
            src={"https://backend.beecolony.org/public/uploads/" + data}
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
        const { id, title, categories, types, thumnail, des } = data;
        return (
          <div>
            <Link href={`/dashboard/editstory/${id}`}>
              <Tag className="edit-button">
                <BsPencil
                  color="rgb(32, 166, 147)"
                  size="15px"
                  style={{ marginTop: "6px" }}
                />
              </Tag>
            </Link>
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
                    await refetch();
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
      <MainNavbar />
      <br></br>
      {loggedIn === true && (
        <div className="container">
          <div className="profile-content">
            <div className="sub-pf-content">
              <h2>Your Stories</h2>
              <Table
                // key={data.get_own_news.id}
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={data.get_own_news}
                // onChange={onChange}
              />
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

export default Allstory;
