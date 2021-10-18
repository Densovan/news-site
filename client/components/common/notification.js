import { useState } from 'react';
import { GET_NOTIFICATION } from '../../graphql/query';
import { useQuery, useMutation } from '@apollo/client';
import { Badge, Popover, Row, Col, Typography, Avatar } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { HiOutlineBell, HiBell } from 'react-icons/hi';
import moment from 'moment';
import pretty from 'pretty-date';

const Notification = ({ notifications, user }) => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === 'development' ? server_local : server;

  let data = notifications;

  const timeAgo = (time) => {
    var created_date = new Date(time * 1000).getTime() / 1000;
    return <div>{pretty.format(new Date(created_date))}</div>;
  };

  var numArray = data;
  numArray.sort(function (a, b) {
    return b.createdAt - a.createdAt;
  });
  return (
    <>
      {data.map((item) => {
        return (
          <div
            key={item.createdAt}
            className="container-box"
            style={
              item.read
                ? { backgroundColor: 'white' }
                : { backgroundColor: 'transparent' }
            }
          >
            <div className="box-notification">
              <div className="avatar-notification">
                <div>
                  <CaretRightOutlined />
                </div>
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
                      (item.userTo.fullname == user.user.get_user.fullname ? (
                        'mentioned you in a comment: '
                      ) : (
                        <>
                          replied to <strong>{item.userTo.fullname}</strong> on
                          your post:{' '}
                        </>
                      ))}
                    {item.type === 'news' && ' have post: '}
                    {item.type === 'follow' && 'have following on you. '}
                    {item.type !== 'follow'
                      ? item.news.title.length <= 65
                        ? item.news.title
                        : item.news.title.substring(0, 65) + '...'
                      : ''}
                  </li>
                  <li style={{ paddingTop: 4, fontSize: 13, color: '#38a7c8' }}>
                    <strong>{timeAgo(item.createdAt)}</strong>
                  </li>
                </div>
              </div>
              {item.type !== 'follow' ? (
                <div className="image-container">
                  <img
                    src={`${URL_ACCESS}/public/uploads/${item.news.thumnail}`}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Notification;
