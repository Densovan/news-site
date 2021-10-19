import { Fragment } from "react";
const MobileHeader = () => {
  return (
    <Fragment>
      {/*=========== Tablet and Mobile========== */}
      <Header className="mobile-navbar">
        <div>
          <Menu mode="horizontal">
            <Menu.Item onClick={showDrawer}>
              <HiMenu className="buger-icon" color="#ffffff" size={30} />
            </Menu.Item>
            <Link href="/">
              <img
                alt="img"
                className="logo-mobile"
                style={{ height: '40px' }}
                src="/assets/images/logo.png"
              />
            </Link>
          </Menu>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!loggedIn && (
            <div className="top-nav-rigth">
              <TiUser className="gmail-top-nav" />
              <Link href="/signin">Sign in</Link>
              <Divider className="devider-top-nav" type="vertical" />
              <TiUserAdd size={19} className="gmail-top-nav" />
              <Link href="/register">Register</Link>
            </div>
          )}
          {loggedIn && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                // count={notification.get_notification_by_user.length}
                overflowCount={10}
                // style={{ marginTop: 6, marginLeft: -10 }}
              >
                <Popover
                  placement="bottomRight"
                  content={
                    <div className="contain-notification">
                      <div className="drop-notification">
                        <Row
                          justify="space-between"
                          align="middle"
                          className="header-notification"
                        >
                          <Col>
                            <Typography.Title level={5}>
                              Notifications
                            </Typography.Title>
                          </Col>
                        </Row>
                        <Row>
                          {/* {check_notification.get_notification_check_by_user
                            .length === 0 && (
                            <div style={{ paddingLeft: "155px" }}>
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </div>
                          )} */}
                          {/* {check_notification.get_notification_check_by_user.map(
                            (notifications) => {
                              return (
                                <Skeleton
                                  avatar
                                  title={false}
                                  style={{
                                    paddingRight: 10,
                                    paddingLeft: 10,
                                  }}
                                  loading={false}
                                  active
                                >
                                  <div className="container-box">
                                    <Link
                                      href="/"
                                      // href={`/detail/${notifications.news.slug}`}
                                    >
                                      <div className="box-notification">
                                        <div style={{ paddingRight: 8 }}>
                                          <Avatar
                                            src={notifications.user.image}
                                            size={40}
                                          />
                                        </div>
                                        <div>
                                          <strong>
                                            {notifications.user.fullname}{" "}
                                          </strong>{" "}
                                          {notifications.type}{" "}
                                          {notifications.type !== "follow" && (
                                            <>
                                              {notifications.news.title.substring(
                                                0,
                                                45
                                              ) + "..."}
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </Link>
                                    <div className="icon-menu">
                                      <Popconfirm
                                        okText="Remove"
                                        cancelText="No"
                                        title="Are you sure？"
                                        icon={
                                          <QuestionCircleOutlined
                                            style={{ color: "red" }}
                                          />
                                        }
                                        onConfirm={() => {
                                          if (notifications.type === "like") {
                                            try {
                                              deleteLikeNotification({
                                                variables: {
                                                  id: notifications.id,
                                                },
                                              }).then((response) => {
                                                console.log(response);
                                              });
                                            } catch (e) {
                                              console.log(e);
                                            }
                                          } else if (
                                            notifications.type === "comment"
                                          ) {
                                            try {
                                              deleteCommentNotification({
                                                variables: {
                                                  id: notifications.id,
                                                },
                                              }).then((response) => {
                                                console.log(response);
                                              });
                                            } catch (e) {
                                              console.log(e);
                                            }
                                          } else if (
                                            notifications.type === "reply"
                                          ) {
                                            try {
                                              deleteReplyNotification({
                                                variables: {
                                                  id: notifications.id,
                                                },
                                              }).then((response) => {
                                                console.log(response);
                                              });
                                            } catch (e) {
                                              console.log(e);
                                            }
                                          }
                                        }}
                                        placement="bottom"
                                      >
                                        <div className="delete-notifications">
                                          <HiOutlineDotsHorizontal
                                            fontSize={24}
                                          />
                                        </div>
                                      </Popconfirm>
                                    </div>
                                  </div>
                                </Skeleton>
                              );
                            }
                          )} */}
                        </Row>
                        {/* <InfiniteScroll
                            dataLength={
                              check_notification.get_notification_check_by_user
                                .length
                            }
                            next={async () => {
                              fetchMore({
                                variables: {
                                  offset:
                                    check_notification
                                      .get_notification_check_by_user.length,
                                },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                  if (!fetchMoreResult) return prev;
                                  if (
                                    fetchMoreResult
                                      .get_notification_check_by_user.length < 8
                                  ) {
                                    setHasMoreItems(false);
                                  }
                                  return Object.assign({}, prev, {
                                    get_notification_check_by_user: [
                                      ...prev.get_notification_check_by_user,
                                      ...fetchMoreResult.get_notification_check_by_user,
                                    ],
                                  });
                                },
                              });
                            }}
                            hasMore={hasMoreItems}
                            loader={
                              <Content style={{ marginTop: "15px" }}>
                                <center>
                                  <Spin></Spin>
                                </center>
                              </Content>
                            }mongodb+srv://den:04031998den@newstest.i0md1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
                            endMessage={null}
                          ></InfiniteScroll> */}
                      </div>
                    </div>
                  }
                  trigger="click"
                >
                  <div
                    className="notifications"
                    // onClick={async () => {
                    //   try {
                    //     if (notification.get_notification_by_user.length === 0)
                    //       console.log("Refresh");
                    //     else
                    //       await checkNotifications({
                    //         variables: { ownerId: data.get_user.id },
                    //       }).then((response) => {
                    //         console.log(response);
                    //       });
                    //   } catch (e) {
                    //     console.log(e);
                    //   }
                    // }}
                  >
                    <HiOutlineBell
                      style={{
                        height: 26,
                        fontSize: 24,
                        color: '#ffffff',
                      }}
                    />
                  </div>
                </Popover>
              </Badge>
              <Popover
                placement="bottomRight"
                content={
                  <div className="dropdown-avatar">
                    <li className="content-avatar">
                      <Link href="/dashboard/profile">
                        <div className="control-avatar">
                          {/* <Avatar
                                className="avatar-1"
                                size="large"
                                src={data.get_user.image}
                              /> */}
                          <div>
                            <div>
                              <a>
                                <span className="name">
                                  {user.get_user.fullname}
                                </span>
                              </a>
                            </div>
                            <div>
                              <a href="#">
                                <span className="email">
                                  {user.get_user.email}
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <Divider />
                    <li className="content-text">
                      <Link href="/dashboard/profile">
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li className="content-text">
                      <Link href="/dashboard/addstory">
                        <span>Write a story</span>
                      </Link>
                    </li>
                    <li className="content-text">
                      <Link href="/dashboard/allstories">
                        <span>Stories</span>
                      </Link>
                    </li>
                    <li className="content-text" style={{ paddingBottom: 12 }}>
                      <Link href="/dashboard/editProfile">
                        <span>Settings</span>
                      </Link>
                    </li>
                    <Divider />
                    <li className="content-text" style={{ paddingBottom: 12 }}>
                      <span onClick={Logouts}>Logout</span>
                    </li>
                  </div>
                }
                trigger="click"
              >
                <Avatar
                  style={{
                    height: 40,
                    width: 40,
                    paddingTop: 0,
                    marginLeft: 18,
                    cursor: 'pointer',
                    border: 'solid 2px #ffffff9d',
                  }}
                  src={user.get_user.image}
                  shape="circle"
                  size="large"
                />
              </Popover>
            </div>
          )}
        </div>

        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          visible={state.visible}
        >
          <Menu
            style={{
              background: '#262e3c',
              // width: "300px",
            }}
            onClick={onClose}
          >
            <Menu.Item key="1">
              <Link
                className="simple"
                href="/"
                exact
                activeClassName="is-active"
              >
                HOME
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              {' '}
              <Link href="/news" exact activeClassName="is-active">
                NEWS
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link key="3" href="/learns" activeClassName="is-active">
                LEARNS
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link key="4" href="/features" activeClassName="is-active">
                FEATURES
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link href="/about" activeClassName="is-active">
                ABOUT US
              </Link>
            </Menu.Item>
          </Menu>
        </Drawer>
      </Header>
    </Fragment>
  );
};

export default MobileHeader;
