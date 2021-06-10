import { Table, Tag, Space, Button, Avatar, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
    },
    {
        title: 'Portfolio',
        dataIndex: 'portfolio',
        key: 'portfolio',
        render: text =>
            <Avatar.Group
                maxCount={2}
                maxStyle={{
                    color: '#f56a00',
                    backgroundColor: '#fde3cf',
                }}
            >
                <Avatar src="https://variety.com/wp-content/uploads/2015/02/spidey.jpg" />
                <Avatar src="data:image/jpeg;base64,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" />
                <Avatar src="https://www.inspiredtraveler.ca/wp-content/uploads/2021/05/ThorDarkWorld_2194942100-TDW0NNG1._V362444527_SX1080_.jpg" />
            </Avatar.Group>
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        )
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button
                    style={{ background: '#94d0cc', color: '#fff' }}
                    shape="circle"
                    icon={<EditOutlined />}
                    size="middle"
                />
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
        title: 'John Brown',
        description: 32,
        portfolio: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
    },
    {
        key: '2',
        title: 'Jim Green',
        description: 42,
        portfolio: 'London No. 1 Lake Park',
        tags: ['loser']
    },
    {
        key: '3',
        title: 'Joe Black',
        description: 32,
        portfolio: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
    }
];
const UseTable = () => {
    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default UseTable;