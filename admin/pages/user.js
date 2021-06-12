import UseTable from "../src/components/useTable";
import { Tag, Space, Button, Avatar, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>
    },
    {
        title: 'Profile',
        dataIndex: 'profile',
        key: 'profile',
        render: text => <Avatar src={text} shape="square" />
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: "Story",
        dataIndex: 'story',
        key: 'story',
        render: text => 
            <Tag color="green" key={text}>
                { text.length }
            </Tag>
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button
                    style={{ background: '#fb3640', color: '#fff' }}
                    shape="circle"
                    icon={<DeleteOutlined />}
                    size="middle"
                />
            </Space>
        )
    }
];
const data = [
    {
        key: '1',
        id:1,
        profile: 'https://variety.com/wp-content/uploads/2015/02/spidey.jpg',
        username: "Vann Soklay",
        email: 'soklayvann@gmail.com',
        story: ['1', '2']
    },
    {
        key: '2',
        id:2,
        profile: 'https://flxt.tmsimg.com/assets/p170620_p_v10_an.jpg',
        username: "Den Sovan",
        email: 'densovan@gmail.com',
        story: ['1', '2']
    },
    {
        key: '3',
        id:3,
        profile: 'https://img.cinemablend.com/filter:scale/quill/9/d/e/a/d/a/9deadafd169f01f7f2cfaf036cd50f8a16ff0b42.jpg?mw=600',
        username: "San Vuthy",
        email: 'sanvuthy@gmail.com',
        story: ['1', '2']
    }
];
const User = () => {
    return(
        <div className="content-table">
            <div className="title">
                <h1>User</h1>
            </div>
            <UseTable columns={columns} data={data} />
        </div>
    )
}

export default User;