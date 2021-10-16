import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

//api here is an axios instance which has the baseURL set according to the env.
import api from '../services/api';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     async function loadUserFromCookies() {
    //         const token = Cookies.get('token')
    //         if (token) {
    //             console.log("Got a token in the cookies, let's see if it is valid")
    //             api.defaults.headers.Authorization = `Bearer ${token}`
    //             const { data: user } = await api.get('users/me')
    //             if (user) setUser(user);
    //         }
    //         setLoading(false)
    //     }
    //     loadUserFromCookies()
    // }, [])

    const login = async (email, password) => {
        const { data: {access_token, refresh_token} } = await api.post('auth/login', { email, password })
        if (token) {
            console.log("Got token")
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("refresh_token")}`
            // const { data: user } = await api.get('users/me')
            // setUser(user)
            // console.log("Got user", user)
        }
    }

    const logout = (email, password) => {
        Cookies.remove('token')
        setUser(null)
        delete api.defaults.headers.Authorization
        window.location.pathname = '/login'
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading || (!isAuthenticated && window.location.pathname !== '/login')){
    return <>Login.....</>; 
  }
  return children;
};