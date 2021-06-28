import React, { useState, Fragment } from 'react'; 
import Image from 'next/image';
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
        selectKey: "",
        openKey: "",
    })
    const router = useRouter();
    const handleClick = e => {
        e.keyPath.map((path) => {
            console.log(router.pathname);
            if (router.pathname === "/about") {
                setState({
                    selectKey: path,
                    openKey: path
                })
            }
        })
    };
    return(
        <Fragment>
            <Sider trigger={trigger} collapsible collapsed={collapsed} >
                <div className="logo" key="logo">
                  <Link href="/">
                    <img src="/assets/logo/logo.png" alt="logo" />
                  </Link>
                </div>
                <Menu
                    onClick={handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        <Link href="/" >
                            <a className="noselect">Dashboard</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserAddOutlined />}>
                        <Link href="/user">
                            <a className="noselect">User</a>
                        </Link>
                    </Menu.Item>

                    <SubMenu className="noselect" key="sub1" icon={<UsergroupAddOutlined />} title="Member">
                        <Menu.Item key="3">
                            <Link href="/member">
                                <a className="noselect">Member</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link href="/member/create">
                                <a className="noselect">Add Member</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu className="noselect" key="sub2" icon={<AimOutlined />} title="Mission">
                        <Menu.Item key="5">
                            <Link href="/mission">
                                <a className="noselect">Mission</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link href="/mission/create">
                                <a className="noselect">Add Mission</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu className="noselect" key="sub3" icon={<FileSearchOutlined/>} title="About">
                        <Menu.Item key="7">
                            <Link href="/about">
                                <a className="noselect">About</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link href="/about/create">
                                <a className="noselect">Add About</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu className="noselect" key="sub4" icon={<FolderOpenOutlined />} title="Category">
                        <Menu.Item key="9">
                            <Link href="/category">
                                <a className="noselect">Category</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="10">
                            <Link href="/category/create">
                                <a className="noselect">Add Category</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu className="noselect" key="sub5" icon={<FolderOpenOutlined />} title="Type">
                        <Menu.Item key="11">
                            <Link href="/type">
                                <a className="noselect">Type</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="12">
                            <Link href="/type/create">
                                <a className="noselect">Add Type</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    {/* <Menu.Item key="10" icon={<ScheduleOutlined />}>
                        <Link href="/management">
                            <a className="noselect">Management</a>
                        </Link>
                    </Menu.Item> */}
                </Menu>
            </Sider>
        </Fragment>
    )
}

export default SiderBar;