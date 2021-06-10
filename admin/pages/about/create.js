import { Form, Input, Button, Select, Row, Col } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';

const CreateAbout = () => {
    const formRef = React.createRef();
    const [fileList, setFileList] = useState([
        {
            uid: '',
            name: '',
            status: '',
            url: '',
        }
    ]);
    const onFinish = (values) => {
        console.log(values, fileList);
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
                <h1>Create</h1>
            </div>
            <Form layout="vertical" size="large" ref={formRef} onFinish={onFinish}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item
                            name="title"
                            label="Titile"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="descrip"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
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
                </Row>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateAbout;