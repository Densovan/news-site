import UseTable from "../src/components/useTable";
import { Tag, Space, Button, Avatar, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../graphql/queries';
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: id => <div>{id}</div>
    },
    {
        title: 'Title',
        dataIndex: 'name',
        key: 'name',
        render: name => <a>{name}</a>
    },
    {
        title: 'Date',
        dataIndex: 'createBy',
        key: 'createBy'
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
const Type = () => {
    const {data:categories, loading:loading_category, error:error_category} = useQuery(GET_CATEGORIES)

    if (loading_category) return <div>Error</div>;
    if (error_category) return <div>Loading...</div>;
    

    const data = [];
    let i = 1;
    categories.get_categories.forEach(element => {
        data.push({ "key": i, "id": i, "name": element.name, "createBy": element.createBy });
        i++;
    }); 
    
    return(
        <div>
            <div className="title">
                <h1>Type</h1>
            </div>
            <UseTable columns={columns} data={data} />
        </div>
    )
}

export default Type;