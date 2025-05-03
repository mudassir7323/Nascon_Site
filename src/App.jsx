import React from 'react'
import AppRoutes from './AppRoutes'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <Navbar />
      </nav>
      
      <div className="container-fluid mt-5 pt-4">
        <AppRoutes />
      </div>
    </>
  )
}

export default App
