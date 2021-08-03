import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { ADD_MEMBER } from "../../graphql/mutation";
import { useMutation } from "@apollo/client";

const CreateMember = () => {
    const formRef = React.createRef();
    const [form] = Form.useForm();

    const [addMember] = useMutation(ADD_MEMBER);
    const [fileList, setFileList] = useState([
        {
            uid: '',
            name: '',
            status: '',
            url: '',
        }
    ]);
    const onFinish = async (values) => {
        try{
            console.log(values.username, values.position, fileList[0].name );
            await addMember({ variables: { name: values.username, position: values.position, image: fileList[0].name }}).then(async (response) => {
                form.resetFields();
                message.success('Member add success');
            })
        }catch(error){
            throw error
        }
    };

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    
    return (
        <div className="content-create-about">
            <div className="title">
                <h1>Create Member</h1>
            </div>
            <Form layout="vertical" size="large" form={form} ref={formRef} onFinish={onFinish}>
                <Row gutter={[16, 0]}>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="position"
                            label="Position"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            <ImgCrop rotate>
                                <Upload
                                    listType="picture-card"
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {fileList.length < 5 && '+ Images'}
                                </Upload>   
                            </ImgCrop> 
                        </Form.Item>
                    </Col>
                    {/* <Col span={24}>
                        <Form.Item
                            name="facebook"
                            label="Facebook"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input addonBefore={<FacebookOutlined />}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="twitter"
                            label="Twitter"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input addonBefore={<TwitterOutlined />}/>
                        </Form.Item>
                    </Col> */}
                </Row>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateMember;