import { Fragment } from "react";
import MainNavbar from "../components/Layouts/mainNavbar";
import { Row, Col, Typography } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATION_CHECK_BY_USER } from "../graphql/query";

const Notifications = () => {
    const { data:notifications, loading } = useQuery(GET_NOTIFICATION_CHECK_BY_USER);
    if (loading) return <div>loading..</div>;
    return(
        <Fragment>
            <MainNavbar />
            <div className="container">
                <div style={{ marginTop: 20 }}>
                    <Row gutter={[16, 16]} justify="space-between">
                        <Col>
                            <Typography.Title level={3}>Notifications</Typography.Title>
                        </Col>
                        <Col>
                            <Typography.Title level={5}>{notifications.get_notification_check_by_user.length}</Typography.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Row>
                                <h4>Hello</h4>
                            </Row>
                            <Row>
                                <h4>Hello</h4>
                            </Row>
                        </Col>
                        <Col span={18}>
                            {notifications.get_notification_check_by_user.map((notification) => {
                                return(
                                    <Row key={notification.id}>
                                        <h4>{notification.userId}</h4>
                                    </Row>
                                )
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        </Fragment>
    )
}

export default Notifications;