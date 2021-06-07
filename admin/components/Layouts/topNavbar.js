import React, {useState, Fragment} from 'react';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';
import {Layout} from 'antd';

const { Header } = Layout;
const TopNavbar = ({ props }) => {
    const [collapsed, setCollapsed] = useState(false);
    return(
        <Fragment>
            <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: () => {setCollapsed(true)},
                })}
            </Header>
        </Fragment>
    )
}

export default TopNavbar;