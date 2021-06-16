import { Button, Space, DatePicker, Card } from 'antd';
import { CiCircleFilled } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_ALL_NEWS } from '../graphql/queries';

export default function Home() {
  const {data:users, loading:loading_user, error:error_user} = useQuery(GET_USERS,{
    fetchPolicy: "network-only",
    pollInterval: 500,
  })
  const {data:news, loading:loading_news, error:error_news} = useQuery(GET_ALL_NEWS,{
    fetchPolicy: "network-only",
    pollInterval: 500,
  })
  
  if (loading_user || loading_news) return <div>Error</div>;
  if (error_user || error_news) return <div>Loading...</div>;
  return (
    <div>
      <div className="overview">
        <h1>Overview</h1>
      </div>
      <div className="control-card">
      <div className="dashboard-card" style={{backgroundColor:"#FFD79D"}}>
        <div className="card">
          <img src="https://nanoguard.in/wp-content/uploads/2019/09/pic.jpg"/>
          <div className="descr">
            <div className="title-dashboard">Total User</div>
            <div className="total">{users.get_users.length}</div>
          </div>
        </div>
      </div>
      <div className="dashboard-card" style={{backgroundColor:"#FFBEC8"}}>
        <div className="card">
          <img src="https://nanoguard.in/wp-content/uploads/2019/09/pic.jpg"/>
          <div className="descr">
            <div className="title-dashboard">Total Story</div>
            <div className="total">{news.get_all_news.length}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}