import React, { createContext, useState, useContext, useEffect } from "react";
import { GET_USER } from "../graphql/query";
import { useQuery } from "@apollo/client";
import GlobalHeader from "../components/Layouts/globalHeader";
import Cookies from "js-cookie";

import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children, token }) => {
  const [state, setState] = useState({
    auth: false,
    loading: false,
  });
  const [user, setUser] = useState(null);

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

  return (
    <>
      {state.loading ? (
        <AuthContext.Provider
          value={{
            isAuthenticated: !!token,
            user: user !== null && user,
            loading: state.loading,
            logout,
          }}
        >
          <GlobalHeader />
          {children}
        </AuthContext.Provider>
      ) : (
        <></>
      )}
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
