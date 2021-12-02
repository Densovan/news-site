import React, { createContext, useState, useContext, useEffect } from "react";
import { GET_USER } from "../graphql/query";
import { useQuery } from "@apollo/client";
import GlobalHeader from "../components/Layouts/globalHeader";
import Header from "../components/globals/Header";
import Cookies from "js-cookie";
import { Row, Col, Avatar, Input } from "antd";
import Link from "next/link";
import Filter from "../components/globals/Filter";
import Suggestion from "../components/globals/Suggestion";
import FilterNavbar from "../components/Layouts/filterNavbar";
import { useRouter } from "next/router";

import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children, token }) => {
  const { pathname } = useRouter();
  const [state, setState] = useState({
    auth: false,
    loading: false,
  });
  const [user, setUser] = useState([]);
  const [selected, setSelected] = useState(["All"]);
  const [loadingFilter, setLoadingFilter] = useState(false);

  console.log(pathname);
  useEffect(async () => {
    try {
      api.defaults.headers.Authorization = `Bearer ${Cookies.get(
        "refresh_token"
      )}`;
      await api
        .get("verify-token")
        .then(async (response) => {
          await Cookies.set("access_token", response.data.access_token);
          setTimeout(() => {
            setState({
              loading: true,
            });
          }, 1000);
          setState({
            loading: false,
          });
        })
        .catch(async (error) => {
          if (error.response.status === 401 || error.response.status === 403) {
            // await localStorage.removeItem("access_token");
            // await localStorage.removeItem("refresh_token");
            await Cookies.remove("access_token");
            await Cookies.remove("refresh_token");
            setTimeout(() => {
              setState({
                loading: true,
              });
            }, 1000);
            setState({
              loading: false,
            });
          }
        });
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    // const token = localStorage.getItem("access_token");
    const token = Cookies.get("access_token");
    if (token) setState({ auth: true });
    else return setState({ auth: false }), setState({ loading: false });
  }, []);

  const { data } = useQuery(GET_USER);

  useEffect(() => {
    if (!data) return;
    else setUser({ user: data });
  }, [data]);

  const logout = () => {
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("refresh_token");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setState({
      user: null,
    });
    // delete api.defaults.headers.Authorization
    window.location.pathname = "/";
  };

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selected, tag]
      : selected.filter((t) => t !== tag);
    setSelected(nextSelectedTags);
    setLoadingFilter(true);
    setTimeout(() => {
      setSelected(nextSelectedTags);
      setLoadingFilter(false);
    }, 1000);
  };

  const loadingMenu = (loading) => {
    // setLoadingFilter(loading);
    // console.log(loading);
  };

  return (
    <>
      {state.loading ? (
        <AuthContext.Provider
          value={{
            isAuthenticated: !!token,
            user: user !== null && user,
            loading: state.loading,
            logout,
            selected: selected,
            loadingFilter: loadingFilter,
          }}
        >
          <Header />
          {pathname == "/" ||
          pathname == "/search" ||
          pathname == "/topnews" ||
          pathname == "/today" ? (
            <div className="container">
              <br></br>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Filter handleChange={handleChange} selectedTags={selected} />
                  <Suggestion user={user} isAuthenticated={!!token} />
                </Col>
                <Col xs={24} md={16}>
                  {!!token === true && (
                    <Row className="status-style">
                      <Col span={2}>
                        <center>
                          <Avatar
                            style={{
                              height: 35,
                              width: 35,
                              cursor: "pointer",
                              border: "solid 2px #ffffff9d",
                            }}
                            // src={user && user.user.get_user.image}
                            shape="circle"
                          />
                        </center>
                      </Col>
                      <Col span={22}>
                        <Link href="/dashboard/addstory">
                          <Input size="middle" placeholder="Write your story" />
                        </Link>
                      </Col>
                    </Row>
                  )}
                  <FilterNavbar loadingMenu={loadingMenu} />
                  {children}
                </Col>
              </Row>
            </div>
          ) : (
            <>{children}</>
          )}
        </AuthContext.Provider>
      ) : (
        <></>
      )}
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
