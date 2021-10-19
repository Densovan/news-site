import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Login from '../pages/signin'

export const ProtectRoute = ({ children }) => {
  const router = useRouter()
  const [state, setState] = useState({
    isAuthenticated: false,
    token: null
  })
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) setState({ token: token, isAuthenticated: true })
    else setState({ isAuthenticated: false })
  },[])
  return (
      <>
        {state.token ? (router.pathname == "/signin" ? window.location.replace('/404') : children) : (router.pathname == "/signin" ? <Login/> : children)}
      </>
  );
};