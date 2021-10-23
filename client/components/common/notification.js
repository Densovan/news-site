import React from 'react';
import { useMutation } from '@apollo/client';
import { READ_NOTIFICATION } from '../../graphql/mutation';
import { Avatar } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import pretty from 'pretty-date';
import { useRouter } from 'next/router';
import { message } from 'antd';

const Notification = ({ notifications, user }) => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === 'development' ? server_local : server;

  const router = useRouter();
  const [readNotification] = useMutation(READ_NOTIFICATION);

  let data = notifications;

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
    readNotification({ variables: { id: notificationId, type: type } }).then(
      () => {
        slug !== null && router.push(`/detail/${slug}`);
      },
    );
  };
  return (
    <>
      {data.map((item) => {
        console.log(item);
        return item.notifications.map((notification) => {
          console.log(item);
          return (
            notification.user.accountId === user.user.get_user.accountId && (
              <div
                key={item.createdAt}
                className="container-box"
                onClick={(e) =>
                  notification.read ? handleRead(e, notification.id, item.type, item.news != null ? item.news.slug : item.news) : (e.preventDefault(), item.news != null ? (router.push(`/detail/${item.news.slug}`)) : (message.error('This news not found!!!!!')))
                }
                style={
                  notification.read
                    ? { backgroundColor: '#f5f5f5' }
                    : { backgroundColor: 'transparent' }
                }
              >
                <div className="box-notification">
                  <div className="avatar-notification">
                    {notification.read ? (
                        <div>
                          <CaretRightOutlined style={{ color: '#38a7c8' }} />
                        </div>
                      ) : (
                        <div>
                          <CaretRightOutlined style={{ color: 'transparent' }} />
                        </div>
                      )
                    }
                    {item.type !== 'follow' ? (
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
                        {item.type !== 'follow' ? (
                          <>
                            <strong>{item.user.fullname}</strong>{' '}
                          </>
                        ) : (
                          <>
                            <strong>{item.userFollower.fullname}</strong>{' '}
                          </>
                        )}
                        {item.type === 'up' && 'like on your post: '}
                        {item.type === 'comment' && 'comment on your post: '}
                        {item.type === 'reply' &&
                          (item.userTo.fullname ==
                          user.user.get_user.fullname ? (
                            'mentioned you in a comment: '
                          ) : (
                            <>
                              replied to <strong>{item.userTo.fullname}</strong>{' '}
                              on your post:{' '}
                            </>
                          ))}
                        {item.type === 'news' && ' have post: '}
                        {item.type === 'follow' && 'have following on you. '}
                        {item.type !== 'follow' ? (item.news != null ? (item.news.title.length <= 65 ? item.news.title : item.news.title.substring(0, 65) + '...') : "404") : ''}
                      </li>
                      <li
                        style={{
                          paddingTop: 4,
                          fontSize: 13,
                          color: '#38a7c8',
                        }}
                      >
                        <strong>{timeAgo(item.createdAt)}</strong>
                      </li>
                    </div>
                  </div>
                  {item.type !== 'follow' ? (
                    <div className="image-container">
                      <img
                        src={`${URL_ACCESS}/public/uploads/${item.news != null && item.news.thumnail}`}
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            )
          );
        });
      })}
    </>
  );
};

export default Notification;
