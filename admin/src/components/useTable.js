import { Table } from 'antd';

const UseTable = ({columns, data}) => {
    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default UseTable;