import React, { useState, Fragment } from 'react'; 
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const SiderBar = () => {
    
    return(
        <Fragment>
            <Sider >
              <div className="logo" />
            </Sider>
        </Fragment>
    )
}

export default SiderBar;