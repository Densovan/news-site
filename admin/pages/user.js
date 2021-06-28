import UseTable from "../src/components/useTable";
import { Tag, Space, Button, Avatar, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { useQuery } from "@apollo/client";
import { GET_USERS } from '../graphql/queries';
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
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
    },
    {
        title: 'Action',
        dataIndex: 'ban',
        key: 'ban',
        render: ban => {
            if (ban === false) {
                return(<div>Active</div>)
            }
            if (ban === true) {
                return(<div>Ban</div>)   
            }
        }
    }
];
const User = () => {
    const {data:users, loading:loading_users, error:error_users} = useQuery(GET_USERS,{
        fetchPolicy: "network-only",
        pollInterval: 500,
    })

    if (loading_users) return <div>Error</div>;
    if (error_users) return <div>Loading...</div>;

    const data = [];
    let i = 1;
    users.get_users.forEach(element => {
        data.push({"key": i, "id": i, "email": element.email, "username":element.fullname, "role": element.role, "ban":element.ban, "image":element.image})
        i++
    });
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