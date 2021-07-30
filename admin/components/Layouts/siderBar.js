import React, { useState, Fragment, useEffect, useRef } from 'react'; 
import Image from 'next/image';
import {Layout, Menu } from 'antd';
import  pathToolURl from '../../src/_utils/pathTool';

import {
    DashboardOutlined,
    FileSearchOutlined,
    UsergroupAddOutlined,
    UserAddOutlined,
    FolderOpenOutlined,
    AimOutlined,
    ReadOutlined
} from '@ant-design/icons';

import Link from "next/link";
import { useRouter } from "next/router";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderBar = ({ trigger, collapsed }) => {
    const [alert, setAlert] = useState(false);
    const mounted = useRef(true);
    const [state, setState] = useState({
        selectKey: [],
        openKey: [],
    })
    const router = useRouter();

    useEffect(() => {
        try{
            if (state.selectKey.length || state.openKey.length && !alert) {
                return null;
            }
            mounted.current = true;
            if (mounted.current) {
                pathToolURl.forEach(url => {
                    if (router.pathname === url[1]) {
                        if (url.length === 2) {
                            setState({
                                selectKey:url[0]
                            });
                        }
                        else if(url.length === 3){
                            setState({
                                selectKey:url[0],
                                openKey:url[2]
                            })
                        }
                    }
                });
            }
            return () => (mounted.current = false);
        }catch(e){
            console.log("Sorry for have problem");
        }
    },[alert, state.selectKey, state.openKey]);
    const handleClick = e => {
        if (e.keyPath.length === 2)
            setState({
                selectKey: e.keyPath[0],
                openKey: e.keyPath[1]
            })
        else if(e.keyPath.length === 1)
            setState({
                selectKey: e.keyPath[0],
            })
    };
    const selectKeyx = [];
    const openKeyx = [];
    selectKeyx.push(state.selectKey);
    openKeyx.push(state.openKey);
    if (state.selectKey.length === 0)
        return null;
    else
        selectKeyx.push(state.selectKey);  
        if (state.openKey != null)
            openKeyx.push(state.openKey);
    
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
                    defaultSelectedKeys={selectKeyx}
                    defaultOpenKeys={openKeyx}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1" icon={<DashboardOutlined style={{ fontSize:18 }}/>}>
                        <Link href="/" >
                            <a className="noselect" style={{ fontSize:14 }}>Dashboard</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserAddOutlined style={{ fontSize:18 }} />}>
                        <Link href="/user">
                            <a className="noselect" style={{ fontSize:14 }}>User</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="11" icon={<ReadOutlined style={{ fontSize:18 }} />}>
                        <Link href="/story">
                            <a className="noselect" style={{ fontSize:14 }}>Story</a>
                        </Link>
                    </Menu.Item>
                    <SubMenu className="noselect" key="sub1" icon={<UsergroupAddOutlined style={{ fontSize:18 }} />} title="Member">
                        <Menu.Item key="3">
                            <Link href="/member">
                                <a className="noselect" style={{ fontSize:14 }}>Member</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link href="/member/create">
                                <a className="noselect" style={{ fontSize:14 }}>Add Member</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu className="noselect" key="sub2" icon={<AimOutlined style={{ fontSize:18 }} />} title="Mission">
                        <Menu.Item key="5">
                            <Link href="/mission">
                                <a className="noselect" style={{ fontSize:14 }}>Mission</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link href="/mission/create">
                                <a className="noselect"  style={{ fontSize:14 }}>Add Mission</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu className="noselect" key="sub3" icon={<FileSearchOutlined style={{ fontSize:18 }}/>} title="About">
                        <Menu.Item key="7">
                            <Link href="/about">
                                <a className="noselect" style={{ fontSize:14 }}>About</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link href="/about/create">
                                <a className="noselect"  style={{ fontSize:14 }}>Add About</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu className="noselect" key="sub4" icon={<FolderOpenOutlined style={{ fontSize:18 }}/>} title="Feature">
                        <Menu.Item key="9">
                            <Link href="/feature/type">
                                <a className="noselect" style={{ fontSize:14 }}>Type</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="10">
                            <Link href="/feature/category">
                                <a className="noselect" style={{ fontSize:14 }}>Category</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        </Fragment>
    )
}

export default SiderBar;