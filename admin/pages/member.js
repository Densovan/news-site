import UseTable from "../src/components/useTable";
import { Tag, Space, Button, Avatar, Tooltip, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MEMBERS } from "../graphql/queries";
import {useRouter} from 'next/router'

const { Paragraph } = Typography;
const Member = () => {
    const router = useRouter();
    const {data:members, loading, error} = useQuery(GET_MEMBERS);

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Loading...</div>;

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
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: text => <Paragraph ellipsis={{ rows: 3, expandable: true }}>{text}</Paragraph>,
        //     width: '40%'
        // },
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
                    <Avatar src={text} />
                </Avatar.Group>
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <Tag color="green" key={tags}>
                    {tags.toUpperCase()}
                </Tag>
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
                        onClick={() => { router.push({
                                pathname: "/member/edit",
                                query:{ data: JSON.stringify(record) }
                            }) 
                        }}
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

    const data = [];
    let i = 1;
    members.get_members.forEach(element => {
        data.push({ "key": i, "id": i, "username": element.name, portfolio: element.image, tags: element.position ,"objectId":element.id });
        i++;
    });
    return(
        <div>
            <UseTable columns={columns} data={data}/>
        </div>
    )
}

export default Member;