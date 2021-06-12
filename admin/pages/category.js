import UseTable from "../src/components/useTable";
import { Tag, Space, Button, Avatar, Tooltip } from 'antd';
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
                <Avatar src="https://flxt.tmsimg.com/assets/p170620_p_v10_an.jpg" />
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
const Category = () => {
    return(
        <div>
            <div className="title">
                <h1>Category</h1>
            </div>
            <UseTable columns={columns} data={data} />
        </div>
    )
}

export default Category;