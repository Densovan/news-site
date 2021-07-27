import React, { useState, Fragment, useEffect, useRef } from 'react'; 
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
    const [alert, setAlert] = useState(false);
    const mounted = useRef(true);
    const [state, setState] = useState({
        selectKey: "3",
        openKey: "sub1",
    })
    const [route, setRoute] = useState([]);
    const router = useRouter();
    const path = [["1", "/"], ["2", "/user"], ["3", "/member", "sub1"], ["4", "/member/create", "/sub1"]];
    
    useEffect(() => {
        try{
            if (route.length && !alert) {
                return;
            }
            mounted.current = true;
            if (mounted.current) {
                path.forEach(url => {
                    if (router.pathname === url[1]) {
                        setRoute(url[0]);
                    }
                });
                // if(router.pathname === "/"){
                //     setRoute("1");
                // }
                // if (router.pathname === "/user") {
                //     setRoute("2");
                // }
            }
            return () => (mounted.current = false);
        }catch(e){
            console.log("Sorry for have problem");
        }
    },[alert, route]);
    const handleClick = e => {
        setState({
            selectKey: e.keyPath[0],
            openKey: e.keyPath[1]
        })
    };
    const selectKey = [];
    const openKey = [];
    if (route.length === 0) {
        return null;
    }
    else{
        selectKey.push(route);
    }
    return(
        <Fragment>
            <Sider width={240} trigger={trigger} collapsible collapsed={collapsed}>
                <div className="logo" key="logo">
                  <Link href="/">
                    <img src="/assets/logo/logo.png" alt="logo" />
                  </Link>
                </div>
                <Menu
                    onClick={handleClick}
                    defaultSelectedKeys={selectKey}
                    defaultOpenKeys={[state.openKey]}
                    mode="inline"
                    theme="dark"
                    style={{ height: '100%', borderRight: 0 }}
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
                </Menu>
            </Sider>
        </Fragment>
    )
}

export default SiderBar;