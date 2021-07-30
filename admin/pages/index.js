import { Button, Space, DatePicker, Card, Typography, Row, Col } from 'antd';
import { UserOutlined, EyeOutlined, ReadOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_ALL_NEWS } from '../graphql/queries';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
}
const data1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
const data3 = {
  labels: [
    'Red',
    'Yellow'
],
datasets: [{
  data: [300, 100],
  backgroundColor: [
  '#FF6384',
  '#FFCE56'
  ],
  hoverBackgroundColor: [
  '#FF6384',
  '#FFCE56'
  ]
}]
};
export default function Home() {
  const {data:users, loading:loading_user, error:error_user} = useQuery(GET_USERS)
  const {data:news, loading:loading_news, error:error_news} = useQuery(GET_ALL_NEWS)
  
  if (loading_user || loading_news) return <div>Loading...</div>;
  if (error_user || error_news) return <div>Error</div>;
  return (
    <div>
      <div>
        <Typography.Title level={3}>Overview</Typography.Title>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <div style={{ backgroundColor: 'rgba(69,165,191)', padding: 18, display: 'flex'}}> 
            <div>
              <Typography.Title level={5} style={{ color: '#fff', fontWeight: '400' }}>Users</Typography.Title>
              <div>
                <Typography.Title level={3} style={{ color: '#fff'}}>{users.get_users.length}</Typography.Title>
              </div>
            </div>
            <div style={{ width: '100%', textAlign:'right'}}>
              <UserOutlined style={{ fontSize: 34, color: '#fff' }}/>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div style={{ backgroundColor: 'rgba(226,88,124)',padding: 18, display: 'flex' }}>
            <div>
              <Typography.Title level={5} style={{ color: '#fff', fontWeight: '400' }}>Stories</Typography.Title>
              <div>
                <Typography.Title level={3} style={{ color: '#fff'}}>{ news.get_all_news.length}</Typography.Title>
              </div>
            </div>
            <div style={{ width: '100%', textAlign:'right'}}>
              <ReadOutlined style={{ fontSize: 34, color: '#fff' }}/>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div style={{ backgroundColor: 'rgba(84,189,166)',padding: 18, display: 'flex' }}>
            <div>
              <Typography.Title level={5} style={{ color: '#fff', fontWeight: '400' }}>Views</Typography.Title>
              <div>
                <Typography.Title level={3} style={{ color: '#fff'}}>10000000</Typography.Title>
              </div>
            </div>
            <div style={{ width: '100%', textAlign:'right'}}>
              <EyeOutlined style={{ fontSize: 34, color: '#fff' }}/>
            </div>
          </div>
        </Col>    
        <Col span={6}>
          <div style={{ backgroundColor: 'rgba(245,187,42)', padding: 18, display: 'flex' }}>
            <div>
              <Typography.Title level={5} style={{ color: '#fff', fontWeight: '400' }}>Views</Typography.Title>
              <div>
                <Typography.Title level={3} style={{ color: '#fff'}}>10000000</Typography.Title>
              </div>
            </div>
            <div style={{ width: '100%', textAlign:'right'}}>
              <EyeOutlined style={{ fontSize: 34, color: '#fff' }}/>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div style={{ padding: 18}}>
            <Doughnut
               data={data3}
               width={400}
               height={400}
            />
          </div>
        </Col>
        <Col span={18}>
          <div style={{ padding: 18}}>
            <Bar
              data={data}
              width={400}
              height={300}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div>
        </Col>
      </Row>
      <div className="control-card">
      {/* <div className="dashboard-card" style={{backgroundColor:"#FFD79D"}}>
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
      </div> */}
      
      {/* <div className="dashboard-card">
        <Line
          data={data1}
          width={400}
          height={400}
        />
      </div>
      <div className="dashboard-card">
        <Bar
          data={data}
          width={400}
          height={200}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
      <div className="dashboard-card">
      <Doughnut
         data={data3}
         width={400}
         height={400}
      />
      </div> */}
    </div>
    </div>
  );
}