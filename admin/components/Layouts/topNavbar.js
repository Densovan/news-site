import React, {useState, Fragment} from 'react';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingOutlined,
    QuestionCircleOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
import { Layout, Dropdown, Menu, Button, Typography } from 'antd';
import { Avatar, Image } from 'antd';
import { Row, Col } from 'antd';

const { Header } = Layout;
const { Text, Link } = Typography;

const TopNavbar = ({ collapsed, toggle }) => {
    const menu = (
        <Menu style={{width: 180}}>
          <Menu.Item icon={<SettingOutlined />}>
            <a>
              Setting
            </a>
          </Menu.Item>
          <Menu.Item icon={<QuestionCircleOutlined />}>
            <a>
              Help
            </a>
          </Menu.Item>
          <Menu.Item icon={<LogoutOutlined />}>
            <a>
              Logout
            </a>
          </Menu.Item>
        </Menu>
    )
    return(
        <Fragment>
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <div className="nav">
                    <div>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                          className: 'trigger',
                          onClick: () => { toggle(!collapsed)}
                        })}
                        <Text style={{marginLeft: 18, fontSize: 18}}>Dashboard</Text>
                    </div>
                    <div>
                        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
                            <a onClick={e => e.preventDefault()}>
                                <Avatar className="avatar-image" src="https://flxt.tmsimg.com/assets/p170620_p_v10_an.jpg" size={40}/>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        </Fragment>
    )
}

export default TopNavbar;