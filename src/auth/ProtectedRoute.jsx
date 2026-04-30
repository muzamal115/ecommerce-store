

import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/admin/LoadingSpinner'

const ProtectedRoute = ({children}) => {

    const{loading,user}=useAuth()
 

    if(loading) return <LoadingSpinner/>
    if(!user) {
    return <Navigate to='/login'/> 
    }
    
  return  children
}

export default ProtectedRoute