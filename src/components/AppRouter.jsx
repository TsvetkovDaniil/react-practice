import React, { useContext, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/context'
import About from '../pages/About'
import Error from '../pages/Error'
import PostIdPage from '../pages/PostIdPage'
import Posts from '../pages/Posts'
import { publicRoutes, privateRoutes } from '../router/routes'
import Loader from './UI/Loader/Loader'

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <Loader />
  }

  return (
    <Routes>
      {isAuth ? (
        <>
          {privateRoutes.map((r) => (
            <Route
              key={r.path}
              exact={r.exact}
              path={r.path}
              element={<r.component />}
            />
          ))}
          <Route key={'*'} path="*" element={<Navigate to={'/about'} />} />
        </>
      ) : (
        <>
          {publicRoutes.map((r) => (
            <Route
              key={r.path}
              exact={r.exact}
              path={r.path}
              element={<r.component />}
            />
          ))}
          <Route key={'*'} path="*" element={<Navigate to={'/login'} />} />
        </>
      )}
    </Routes>
  )
}

export default AppRouter
