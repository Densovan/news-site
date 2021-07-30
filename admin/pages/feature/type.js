import React, { useState } from "react";
import UseTable from "../../src/components/useTable";
import { Tag, Space, Button, Avatar, Tooltip, Typography, Form, Row, Col, Input, message} from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TYPES } from '../../graphql/queries';
import { ADD_TYPE, EDIT_TYPE, DELETE_TYPE } from '../../graphql/mutation';
import Pupop from '../../src/components/Popup';

const Type = () => {
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState([]);
    const formRef = React.createRef();
    const [form] = Form.useForm();

    const [addType] = useMutation(ADD_TYPE);
    const [editType] = useMutation(EDIT_TYPE);
    const [deleteType] = useMutation(DELETE_TYPE);

    const {data:types, loading:loading_type, error:error_type} = useQuery(GET_TYPES,{
        fetchPolicy: "network-only",
        pollInterval:5000
    })

    if (loading_type) return <div>Loading...</div>;
    if (error_type) return <div>Error</div>;
    
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: id => <div>{id}</div>
        },
        {
            title: 'TITLE',
            dataIndex: 'name',
            key: 'name',
            render: name => <a>{name}</a>
        },
        {
            title: 'NAME',
            dataIndex: 'fullname',
            key: 'fullname'
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        style={{ background: '#94d0cc', color: '#fff' }}
                        shape="circle"
                        icon={<EditOutlined />}
                        size="middle"
                        onClick={() => {
                            setEdit(record), 
                            setVisible(true), 
                            form.setFieldsValue({
                                name: record.name
                            });
                        }}
                    />
                    <Button
                        style={{ background: '#fb3640', color: '#fff' }}
                        shape="circle"
                        icon={<DeleteOutlined />}
                        size="middle"
                        onClick={async () => {
                            try{
                                deleteType({ variables: { 
                                    id: record.objectId }
                                })
                            }catch(e){
                                throw e
                            }
                        }}
                    />
                </Space>
            )
        }
    ];
    const onFinish = async (values) => {
        
        try{
            if(edit == null){
                addType({ variables: values }).then(async (res) => {
                    form.resetFields();
                    message.success('Type add success');
                    setVisible(false);
                })
            }else{
                editType({ variables: { id:edit.objectId, name: values.name }}).then(async (response)=> {
                    form.resetFields();
                    message.success('Type update success');
                    setVisible(false);
                })
            }
        }catch{
            console.log("Sorry for have problem");
        }
    };

    const data = [];
    let i = 1;
    types.get_types.forEach(element => {
        data.push({ "key": i, "id": i, "name": element.name, "fullname": element.user.fullname, "objectId":element.id });
        i++;
    }); 
    
    return(
        <div>
            <div className="title" style={{ display: "flex", justifyContent: "space-between", paddingBottom:20}}>
                <Typography.Title level={5}>Type</Typography.Title>
                <Button onClick={()=> {setVisible(true)}}>Add Type</Button>
            </div>
            <Pupop visible={visible} setVisible={setVisible} form={form} title="Category">
                <Form layout="vertical" form={form} size="large" ref={formRef} onFinish={onFinish}>
                    <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter type name"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Pupop>
            <UseTable columns={columns} data={data} />
        </div>
    )
}

export default Type;