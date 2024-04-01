import React from 'react'

import {Routes, Route} from "react-router-dom"
import AuthPage from '../containers/AuthPage/AuthPage'
import HomePage from '../containers/HomePage/HomePage'
import AddNewPage from '../containers/AddNewPage/AddNewPage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/zubair-bhai-website-auth' element={<AuthPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/add-new' element={<AddNewPage/>}/>
    </Routes>
  )
}

export default AppRoutes