import UseTable from "../src/components/useTable";
import { useQuery, useMutation } from '@apollo/client';
import { Tag, Space, Button, Avatar, Tooltip, Typography, Form, Row, Col, Input, message, Skeleton} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { GET_ALL_NEWS } from '../graphql/queries';

const Story = () => {

    const {data:news, loading, error} = useQuery(GET_ALL_NEWS);

    if(loading) return <div>
        <Skeleton />
    </div>;
    if(error) return <div>Error</div>;
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: id => <div>{id}</div>
        },
        {
            title: 'TITLE',
            dataIndex: 'title',
            key: 'title',
            render: title => <div>{title}</div>
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
                        style={{ background: '#fb3640', color: '#fff' }}
                        shape="circle"
                        icon={<DeleteOutlined />}
                        size="middle"
                        onClick={async () => {
                            try{
                                console.log("hello");
                            }catch(e){
                                throw e
                            }
                        }}
                    />
                </Space>
            )
        }
    ];

    const data = [];
    let i = 1;
    news.get_all_news.forEach(element => {
        data.push({ "key": i, "id": i, "title": element.title, "fullname": element.user.fullname, "objectId":element.id });
        i++;
    });
    return(
        <div>
            <div>
              <Typography.Title level={3}>Story</Typography.Title>
            </div>
            <UseTable columns={columns} data={data}/>
        </div>
    )
}

export default Story;