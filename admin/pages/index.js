import { Button, Space, DatePicker, Card } from 'antd';
import { CiCircleFilled } from '@ant-design/icons';

export default function Home() {

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
            <div className="total">50</div>
          </div>
        </div>
      </div>
      <div className="dashboard-card" style={{backgroundColor:"#FFBEC8"}}>
        <div className="card">
          <img src="https://nanoguard.in/wp-content/uploads/2019/09/pic.jpg"/>
          <div className="descr">
            <div className="title-dashboard">Total User</div>
            <div className="total">50</div>
          </div>
        </div>
      </div>
      <div className="dashboard-card" style={{backgroundColor: "#F0D5EA"}}>
        <div className="card">
          <img src="https://nanoguard.in/wp-content/uploads/2019/09/pic.jpg"/>
          <div className="descr">
            <div className="title-dashboard">Total User</div>
            <div className="total">50</div>
          </div>
        </div>
      </div>
      <div className="dashboard-card" style={{ backgroundColor:"#66B2E4" }}>
        <div className="card">
          <img src="https://nanoguard.in/wp-content/uploads/2019/09/pic.jpg"/>
          <div className="descr">
            <div className="title-dashboard">Total User</div>
            <div className="total">50</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}