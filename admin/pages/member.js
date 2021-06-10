import UseTable from "../src/components/useTable";
import { Tag, Space, Button, Avatar, Tooltip, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';
const { Paragraph } = Typography;

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: text => <div>{text}</div>
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: text => <Paragraph ellipsis={{ rows: 3, expandable: true }}>{text}</Paragraph>,
        width: '40%'
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
        title: 'Social Media',
        dataIndex: 'socialMedia',
        key: 'socialMedia',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    return (
                        <Tag color="green" key={tag}>
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
        id: 1,
        username: 'John Brown',
        description: "Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis. Donec sit amet eros. Lorem ipsum dolor sit amet, consecvtetuer. Mauris fermentum dictum magna. Sed laoreet aliquam leo. Ut tellus dolor, dapibus eget, elementum vel, cursus eleifend, elit. Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis. Integer rutrum ante eu lacus. Vestibulum libero nisl, porta vel, scelerisque eget, malesuada at, neque.",
        portfolio: 'New York No. 1 Lake Park',
        socialMedia:"Facebook",
        tags: ['Mobile Developer', 'Web Developer']
    },
    {
        key: '2',
        id: 2,
        username: 'Jim Green',
        description: "Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis. Donec sit amet eros. Lorem ipsum dolor sit amet, consecvtetuer. Mauris fermentum dictum magna. Sed laoreet aliquam leo. Ut tellus dolor, dapibus eget, elementum vel, cursus eleifend, elit. Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis. Integer rutrum ante eu lacus. Vestibulum libero nisl, porta vel, scelerisque eget, malesuada at, neque.",
        portfolio: 'London No. 1 Lake Park',
        socialMedia: "Twitter",
        tags: ['Manager', 'Web Developer']
    },
    {
        key: '3',
        id:3,
        username: 'Joe Black',
        description: "Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis. Donec sit amet eros. Lorem ipsum dolor sit amet, consecvtetuer. Mauris fermentum dictum magna. Sed laoreet aliquam leo. Ut tellus dolor, dapibus eget, elementum vel, cursus eleifend, elit. Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis. Integer rutrum ante eu lacus. Vestibulum libero nisl, porta vel, scelerisque eget, malesuada at, neque.",
        portfolio: 'Sidney No. 1 Lake Park',
        socialMedia: "Facebook",    
        tags: ['Manager', 'Mobile Developer']
    }
];

const Member = () => {
    return(
        <div>
            <UseTable columns={columns} data={data} />
        </div>
    )
}

export default Member;