import React from "react";
import { useMutation } from "@apollo/client";
import { READ_NOTIFICATION, HIDE_NOTIFICATION } from "../../graphql/mutation";
import { GET_NOTIFICATION } from "../../graphql/query";
import { CaretRightOutlined } from "@ant-design/icons";
import pretty from "pretty-date";
import { useRouter } from "next/router";
import { message, Button, Avatar, Popover, notification } from "antd";
import { EllipsisOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { HiOutlineBell, HiBell } from "react-icons/hi";

const Notification = ({ notifications, user }) => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const router = useRouter();
  const [readNotification] = useMutation(READ_NOTIFICATION);
  const [hideNotification] = useMutation(HIDE_NOTIFICATION);

  let data = notifications;
  console.log(data);

  const timeAgo = (time) => {
    var created_date = new Date(time * 1000).getTime() / 1000;
    return <div>{pretty.format(new Date(created_date))}</div>;
  };

  var numArray = data;
  numArray.sort(function (a, b) {
    return b.createdAt - a.createdAt;
  });

  const handleRead = (e, notificationId, type, slug) => {
    e.preventDefault();
    readNotification({
      variables: {
        id: notificationId,
        type: type,
      },
      refetchQueries: [{ query: GET_NOTIFICATION }],
    }).then(() => {
      slug !== null && router.push(`/detail/${slug}`);
    });
  };
  const handleHide = (e, notificationId, type) => {
    e.preventDefault();
    hideNotification({
      variables: {
        id: notificationId,
        type: type,
      },
      refetchQueries: [{ query: GET_NOTIFICATION }],
    })
      .then(async (response) => {
        notification.open({
          closeIcon: true,
          message: "Hello!",
          description: "You have remove this notification",
          placement: "bottomLeft",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let sum = 0;
  data.map((item) => {
    item.notifications.map((notification) => {
      if (notification.hide) {
        sum += 1;
      } else {
        sum += 0;
      }
    });
  });
  return (
    <>
      {sum > 0 ? (
        data.map((item) => {
          return item.notifications.map((notification) => {
            return (
              notification.user.accountId === user.user.get_user.accountId &&
              notification.hide && (
                // <div key={item.createdAt} className="container-notification">
                <div
                  key={item.createdAt}
                  className="container-box"
                  style={
                    notification.read
                      ? { backgroundColor: "#f5f5f5" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  <div
                    className="box-notification"
                    onClick={(e) =>
                      notification.read
                        ? handleRead(
                            e,
                            notification.id,
                            item.type,
                            item.news != null ? item.news.slug : item.news
                          )
                        : (e.preventDefault(),
                          item.news != null
                            ? router.push(`/detail/${item.news.slug}`)
                            : message.error("This news not found!!!!!"))
                    }
                  >
                    <div className="avatar-notification">
                      {notification.read ? (
                        <div>
                          <CaretRightOutlined style={{ color: "#38a7c8" }} />
                        </div>
                      ) : (
                        <div>
                          <CaretRightOutlined
                            style={{ color: "transparent" }}
                          />
                        </div>
                      )}
                      {item.type !== "follow" ? (
                        <>
                          <div style={{ paddingRight: 8 }}>
                            <Avatar src={item.user.image} size={40} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ paddingRight: 8 }}>
                            <Avatar src={item.userFollower.image} size={40} />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-notification">
                      <div style={{ paddingRight: 8 }}>
                        <li>
                          {item.type !== "follow" ? (
                            <>
                              <strong>{item.user.fullname}</strong>{" "}
                            </>
                          ) : (
                            <>
                              <strong>{item.userFollower.fullname}</strong>{" "}
                            </>
                          )}
                          {item.type === "up" && "like on your post: "}
                          {item.type === "down" && "dislike on your post: "}
                          {item.type === "comment" && "comment on your post: "}
                          {item.type === "reply" &&
                            (item.userTo.fullname ==
                            user.user.get_user.fullname ? (
                              "mentioned you in a comment: "
                            ) : (
                              <>
                                replied to{" "}
                                <strong>{item.userTo.fullname}</strong> on your
                                post:{" "}
                              </>
                            ))}
                          {item.type === "news" && " have post: "}
                          {item.type === "follow" && "have following on you. "}
                          {item.type !== "follow"
                            ? item.news != null
                              ? item.news.title.length <= 65
                                ? item.news.title
                                : item.news.title.substring(0, 65) + "..."
                              : "404"
                            : ""}
                        </li>
                        <li
                          style={{
                            paddingTop: 4,
                            fontSize: 13,
                            color: "#38a7c8",
                          }}
                        >
                          <strong>{timeAgo(item.createdAt)}</strong>
                        </li>
                      </div>
                    </div>
                    {item.type !== "follow" ? (
                      <div className="image-container">
                        <img
                          src={`${URL_ACCESS}/public/uploads/${
                            item.news != null && item.news.thumnail
                          }`}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <Popover
                    placement="bottomRight"
                    content={
                      <div style={{ width: "220px", padding: "8px" }}>
                        <div
                          className="item-link"
                          onClick={(e) =>
                            handleHide(e, notification.id, item.type)
                          }
                        >
                          <CloseSquareOutlined
                            style={{ fontSize: "18px", paddingRight: "4px" }}
                          />
                          <div className="item">Remove this notification</div>
                        </div>
                      </div>
                    }
                    trigger="click"
                  >
                    <Button
                      shape="circle"
                      className="icon-menu"
                      icon={<EllipsisOutlined />}
                    />
                  </Popover>
                </div>
              )
            );
          });
        })
      ) : (
        <div className="container-empty">
          <HiOutlineBell style={{ fontSize: "120px" }} />
          <h3>Empty</h3>
          <h3>Notification</h3>
        </div>
      )}
    </>
  );
};

export default Notification;
