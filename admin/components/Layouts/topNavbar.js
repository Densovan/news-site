import React, {useState, Fragment} from 'react';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';
import {Layout} from 'antd';
import { Avatar, Image } from 'antd';
import { Row, Col } from 'antd';

const { Header } = Layout;
const TopNavbar = ({ collapsed, toggle }) => {
    return(
        <Fragment>
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <div className="nav">
                    <div>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                          className: 'trigger',
                          onClick: () => { toggle(!collapsed)}
                        })}
                    </div>
                    <div>
                        <Avatar className="avatar-image" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size={40}/>
                    </div>
                </div>
            </Header>
        </Fragment>
    )
}

export default TopNavbar;