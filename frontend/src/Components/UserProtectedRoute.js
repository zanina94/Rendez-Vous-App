import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserProtectedRoute = () => {
    const {isAuth , userInfo} = useSelector(state => state.authUser)

  return (
    (isAuth && userInfo.role ==='User') ? <Outlet/> : <Navigate to='/Login'/> 
  )
}

export default UserProtectedRoute