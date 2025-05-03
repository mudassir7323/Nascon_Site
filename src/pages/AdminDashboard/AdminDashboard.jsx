import React, { useState } from 'react';
import CreateAccommodation from './CreateAccomodation';
import ViewAccommodation from './ViewAccomodation';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState('create');

  const renderContent = () => {
    switch (activeComponent) {
      case 'create':
        return <CreateAccommodation />;
      case 'view':
        return <ViewAccommodation />;
      default:
        return <h4 className="text-center">Please select an option</h4>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        {/* Offcanvas Toggle Button (Mobile Only) */}
        <div className="d-md-none bg-light p-2">
          <button
            className="btn btn-outline-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarOffcanvas"
            aria-controls="sidebarOffcanvas"
          >
            ☰ Menu
          </button>
        </div>

        {/* Sidebar for md+ screens */}
        <div
          className="col-md-3 d-none d-md-block p-4"
          style={{ backgroundColor: '#1e1e2f', color: '#ffffff', minHeight: '100vh' }}
        >
          <Sidebar setActiveComponent={setActiveComponent} />
        </div>

        {/* Offcanvas Sidebar for small screens */}
        <div
          className="offcanvas offcanvas-start d-md-none"
          tabIndex="-1"
          id="sidebarOffcanvas"
          aria-labelledby="sidebarOffcanvasLabel"
          style={{ backgroundColor: '#1e1e2f', color: '#ffffff' }}
        >
          <div className="offcanvas-header">
            <h5 id="sidebarOffcanvasLabel" className="text-white">Menu</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <Sidebar setActiveComponent={setActiveComponent} />
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-5 bg-light">{renderContent()}</div>
      </div>
    </div>
  );
}

function Sidebar({ setActiveComponent }) {
  return (
    <>
      <h4 className="text-white mb-4">🏢 Admin Panel</h4>

      <div className="dropdown mb-3">
        <button
          className="btn btn-secondary dropdown-toggle w-100 text-start"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ backgroundColor: '#2b2b3d', borderColor: '#2b2b3d' }}
        >
          🛏️ Accommodation
        </button>
        <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
          <li>
            <button className="dropdown-item" onClick={() => setActiveComponent('create')}>
              ➕ Create Accommodation
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => setActiveComponent('view')}>
              📄 View Accommodation
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminDashboard;
