import React, { useState, Fragment } from 'react'; 
import {Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    FileSearchOutlined,
    UsergroupAddOutlined,
    UserAddOutlined,
    FolderOpenOutlined,
    ScheduleOutlined,
    AimOutlined
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
    const handleClick = e => {
        console.log('click ', e);
    };
    return(
        <Fragment>
            <Sider trigger={trigger} collapsible collapsed={collapsed} >
                <div className="logo" />
                <Menu
                    onClick={handleClick}
                    defaultSelectedKeys={[`${state.selection}`]}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        <Link href="/" >
                            <a class="noselect">Dashboard</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserAddOutlined />}>
                        <Link href="/user">
                            <a class="noselect">User</a>
                        </Link>
                    </Menu.Item>
                    <SubMenu icon={<UsergroupAddOutlined />} title="Member">
                        <Menu.Item key="5">
                            <Link href="/member">
                                <a class="noselect">Member</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link href="/member/create">
                                <a class="noselect">Add Member</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu icon={<AimOutlined />} title="Mission">
                        <Menu.Item key="5">
                            <Link href="/misson">
                                <a class="noselect">Misson</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link href="/misson/create">
                                <a class="noselect">Add Misson</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub1" icon={<FileSearchOutlined/>} title="About">
                        <Menu.Item key="7">
                            <Link href="/about">
                                <a class="noselect">About</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link href="/about/create">
                                <a class="noselect">Add About</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FolderOpenOutlined />}>
                        <Link href="/category">
                            <a class="noselect">Category</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="10" icon={<ScheduleOutlined />}>
                        <Link href="/management">
                            <a class="noselect">Management</a>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </Fragment>
    )
}

export default SiderBar;