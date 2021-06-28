import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import { useMutation } from '@apollo/client';
import { ADD_CATEGORY } from '../../graphql/mutation';

const CategoryCreate = () => {
    const formRef = React.createRef();
    const [form] = Form.useForm();

    const [addCategory] = useMutation(ADD_CATEGORY);
    const onFinish = async (values) => {
        addCategory({ variables: values }).then(async (res) => {
            form.resetFields();
            message.success('Category add success');
        })
    };
    return(
        <div className="content-create-about">
            <div className="title">
                <h1>Create Category</h1>
            </div>
            <Form layout="vertical" form={form} size="large" ref={formRef} onFinish={onFinish}>
                <Row gutter={[16, 0]}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Category"
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

export default CategoryCreate;