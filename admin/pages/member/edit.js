import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
// import {  } from "../../graphql/mutation";
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router';

const EditMember = () => {
    const router = useRouter();
    const dataEdit = JSON.parse(router.query.data);
    const formRef = React.createRef();
    const [form] = Form.useForm();

    // const [editMember] = useMutation(ADD_MEMBER);
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'update.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ]);
    form.setFieldsValue({
        username: dataEdit.username,
        position: dataEdit.tags,
    });
    const onFinish = async (values) => {
        try{
            // await addMember({ variables: { name: values.username, position: values.position, image: fileList[0].name }}).then(async (response) => {
            //     form.resetFields();
            //     message.success('Member add success');
            // })
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
            <Button onClick={() => {router.push('/member')}}>Back</Button>
            <div className="title">
                <h1>Edit Member</h1>
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
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                >
                                    {fileList.length < 5 && '+ Images'}
                                </Upload>   
                            </ImgCrop> 
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

export default EditMember;