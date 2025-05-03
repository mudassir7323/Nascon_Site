import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Import pages
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'

function AppRoutes() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  )
}

export default AppRoutes
