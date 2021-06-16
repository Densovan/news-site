import { Form, Input, Button, Select, Row, Col } from 'antd';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TYPE } from '../../graphql/mutation';

const TypeCreate = () => {
    const formRef = React.createRef();

    const [addType] = useMutation(ADD_TYPE);
    const onFinish = (values) => {
        addType({ variables: values });
    };
    return(
        <div className="content-create-about">
            <div className="title">
                <h1>Create Type</h1>
            </div>
            <Form layout="vertical" size="large" ref={formRef} onFinish={onFinish}>
                <Row gutter={[16, 0]}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Type"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default TypeCreate;