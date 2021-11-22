import React, { useEffect, useState, useRef } from "react";
import { Menu, Button, Space, Spin } from "antd";
import {
  AiOutlineHome,
  AiFillRocket,
  AiOutlineRocket,
  AiFillHome,
  AiOutlineCarryOut,
  AiFillCarryOut,
} from "react-icons/ai";
import { LoadingOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useRouter } from "next/router";
import pathToolURl from "../_utils/pathTool";

const FilterNavbar = ({ loadingMenu }) => {
  const [alert, setAlert] = useState(false);
  const mounted = useRef(true);
  const [state, setState] = useState({
    selectKey: [],
    openKey: [],
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    try {
      if (state.selectKey.length || (state.openKey.length && !alert)) {
        return null;
      }
      mounted.current = true;
      if (mounted.current) {
        pathToolURl.forEach((url) => {
          if (router.pathname === url[1]) {
            if (url.length === 2) {
              setState({
                selectKey: url[0],
              });
              setTimeout(() => {
                setLoading(true)
              },1000)
              
              setLoading(false)
        
            } else if (url.length === 3) {
              setState({
                selectKey: url[0],
                openKey: url[2],
              });
              setTimeout(() => {
                setLoading(true)
              },1000)

              setLoading(false)
            }
          }
        });
      }
      return () => (mounted.current = false);
    } catch (e) {
      console.log("Sorry for have problem");
    }
  }, [alert, state.selectKey, state.openKey]);
  const handleClick = (e) => {
    if (e.keyPath.length === 2){
      setState({
        selectKey: e.keyPath[0],
        openKey: e.keyPath[1],
      })
      setTimeout(() => {
        setLoading(true)
      },1000)

      setLoading(false)
    }
      
    else if (e.keyPath.length === 1){
      setState({
        selectKey: e.keyPath[0],
      });
      setTimeout(() => {
        setLoading(true)
      },1000)
      
      setLoading(false)
    }
  };
  const selectKeyx = [];
  const openKeyx = [];
  selectKeyx.push(state.selectKey);
  openKeyx.push(state.openKey);
  if (state.selectKey.length === 0) {
    return null;
  } else {
    selectKeyx.push(state.selectKey);
    if (state.openKey != null) {
      openKeyx.push(state.openKey);
    }
  }

  const text = (text, icon, color) => {
    return (
      <div
        className="box-nav-filter"
        style={{
          color: color == selectKeyx[0] ? "#38a7c8" : "black",
          backgroundColor: color == selectKeyx[1] ? "#f5f5f5" : "transparent",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="icon">{icon}</div>
          <div className="text">{text}</div>
        </div>
      </div>
    );
  };

  loadingMenu(loading);
  return (
    <div>
      <Menu
        style={{ display: "flex", height: '46px', alignItems: "center"}}
        onClick={handleClick}
        defaultSelectedKeys={selectKeyx}
        defaultOpenKeys={openKeyx}
        mode="horizontal"
      >
        <Menu.Item key="1" style={{ paddingRight: '4px' }}>
          <Link href="/">
            {text(
              "Home",
              selectKeyx[0] == 1 ? (
                <AiFillHome style={{ fontSize: 20 }} />
              ) : (
                <AiOutlineHome style={{ fontSize: 20 }} />
              ),
              1
            )}
          </Link>
        </Menu.Item>
        <Menu.Item key="2" style={{ paddingRight: '4px' }}>
          <Link href="/topnews">
            {text(
              "Top",
              selectKeyx[0] == 2 ? (
                <AiFillRocket style={{ fontSize: 20 }} />
              ) : (
                <AiOutlineRocket style={{ fontSize: 20 }} />
              ),
              2
            )}
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/today">
            {loading ?
              text(
                "Today",
                selectKeyx[0] == 3 ? (
                  <AiFillCarryOut style={{ fontSize: 20 }} />
                ) : (
                  <AiOutlineCarryOut style={{ fontSize: 20 }} />
                ),
                3
              )
            :
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            }
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default FilterNavbar;
