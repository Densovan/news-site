import React, { useContext } from "react";
import Profile from "./profile";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SAVED } from "../../graphql/query";
import { DELETE_NEWS_SAVE } from "../../graphql/mutation";
import Footer from "../../components/Layouts/footer";
import { useAuth } from "../../layouts/layoutAuth";
import Link from "next/link";
import { BsTrash, BsPencil } from "react-icons/bs";
import { Table, Tag, Divider, Popconfirm, message } from "antd";

const saved = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;
  const { isAuthenticated } = useAuth();
  const [delete_save_news] = useMutation(DELETE_NEWS_SAVE);
  const { loading, data, refetch } = useQuery(GET_SAVED, {
    variables: { limit: 6, offset: 0 },
    pollInterval: 500,
  });
  if (loading) return "laoding...";
  //   console.log(more);
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
            src={`${URL_ACCESS}/public/uploads//` + data}
            // src={"https://backend.beecolony.org/public/uploads/" + data}
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
        const { id, slug } = data;
        return (
          <div>
            <Link href={`/detail/${slug}`}>
              <Tag style={{ cursor: "pointer" }} color="green">
                Check
              </Tag>
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                delete_save_news({ variables: { id: `${id}` } })
                  .then(async (res) => {
                    await message.success(res.data.delete_save_news.message);
                    await refetch();
                  })
                  .catch((error) => {
                    console.log(error);
                    return null;
                  });
              }}
            >
              <Tag style={{ cursor: "pointer" }} color="volcano">
                Remove
                {/* <BsTrash
                  color="#ff5858"
                  size="15px"
                  style={{ marginTop: "6px" }}
                /> */}
              </Tag>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <Profile />
      {isAuthenticated === true && (
        <div className="container">
          <div className="profile-content">
            <div className="sub-pf-content">
              <h2>Stories Saved</h2>
              <Table
                // key={data.get_own_news.id}
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={data.get_save_news_by_userId}
                // onChange={onChange}
              />
            </div>
          </div>
        </div>
      )}
      {isAuthenticated === false && window.location.replace("/")}
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default saved;
