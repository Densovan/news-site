import React, { useState, Fragment } from 'react'; 
import {Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    FileSearchOutlined,
    UploadOutlined,
    MailOutlined
} from '@ant-design/icons';

import ActiveLink from "../activeLink";
import Link from "next/link";
import { useRouter } from "next/router";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderBar = ({ trigger, collapsed }) => {
    const [state, setState] = useState({
        selection: 1
    })
    const router = useRouter();
    return(
        <Fragment>
            <Sider trigger={trigger} collapsible collapsed={collapsed} >
                <div className="logo" />
                <Menu
                    defaultSelectedKeys={[`${state.selection}`]}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        <Link href="/" >
                            <a>Dashboard</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FileSearchOutlined />}>
                        <Link href="/about">
                            <a>About</a>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </Fragment>
    )
}

export default SiderBar;