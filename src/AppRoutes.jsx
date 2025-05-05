import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Import pages
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import Events from "./pages/Events"
// Import components
import ProtectedRoute from './components/ProtectedRoute'

function AppRoutes() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/signin" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />






      <Route
        path="/AdminDashboard"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  )
}

export default AppRoutes
