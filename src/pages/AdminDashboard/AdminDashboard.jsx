import React, { useState, useEffect } from 'react';
import CreateAccommodation from './create/CreateAccomodation';
import ViewAccommodation from './view/ViewAccomodation';
import CreateRoom from './create/CreateRoom';
import ViewRooms from './view/ViewRooms';
import CreateNewRoomType from './create/CreateNewRoomType';
import ViewRoomTypes from './view/ViewRoomTypes';
import ViewAllRequests from './view/ViewAllRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateRoomAllocation from './create/CreateRoomAllocation';
import ViewRoomAllocations from './view/ViewRoomAllocations';
import CreateEventCategory from './create/CreateEventCategory';
import ViewEventCategories from './view/ViewEventCategories';
import CreateVenue from './create/CreateVenue';
import ViewVenues from './view/ViewVenues';
import CreateEvent from './create/CreateEvent';
import ViewEnents from './view/ViewEnents';

function AdminDashboard() {
    const [activeComponent, setActiveComponent] = useState('create');

    const renderContent = () => {
        switch (activeComponent) {
            case 'create':
                return <CreateAccommodation />;
            case 'view':
                return <ViewAccommodation />;
            case 'createnewroomtype':
                return <CreateNewRoomType />;
            case 'viewroomtypes':
                return <ViewRoomTypes />;
            case 'createRoom':
                return <CreateRoom />;
            case 'viewRooms':
                return <ViewRooms />;
            case 'viewAllRequests':
                return <ViewAllRequests />;
            case 'createRoomAllocation':
                return <CreateRoomAllocation />;
            case 'viewRoomAllocations':
                return <ViewRoomAllocations />;
            case 'createEventCategory':
                return <CreateEventCategory />;
            case 'viewEventCategories':
                return <ViewEventCategories />;
            case 'createVenue':
                return <CreateVenue />;
            case 'viewVenues':
                return <ViewVenues />;
            case 'createEvent':
                return <CreateEvent />;
            case 'viewEvents':
                return <ViewEnents />;
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
                    data-bs-backdrop="false"
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
                    <div className="offcanvas-body" onClick={(e) => e.stopPropagation()}>
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
    const handleMenuItemClick = (component, event) => {
        event.stopPropagation();
        setActiveComponent(component);

        // Handle dropdown closing
        const dropdownMenu = event.target.closest('.dropdown-menu');
        if (dropdownMenu) {
            setTimeout(() => {
                const dropdownToggle = dropdownMenu.previousElementSibling;
                if (dropdownToggle) {
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                }
                dropdownMenu.classList.remove('show');
            }, 50);
        }

        // Auto close offcanvas in mobile view
        if (window.innerWidth < 768) {
            const offcanvasEl = document.getElementById('sidebarOffcanvas');
            if (offcanvasEl && window.bootstrap?.Offcanvas) {
                const offcanvasInstance = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
                if (offcanvasInstance) {
                    offcanvasInstance.hide();
                }
            }
        }
    };

    return (
        <>
            <h4 className="text-white mb-4">🏢 Admin Panel</h4>

            {/* Accommodation Dropdown */}
            <div className="dropdown mb-3">
                <button
                    className="btn btn-secondary dropdown-toggle w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    style={{ backgroundColor: '#2b2b3d', borderColor: '#2b2b3d' }}
                >
                    🛏️ Accommodation
                </button>
                <ul className="dropdown-menu w-100">
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('create', e)}>
                            ➕ Create Accommodation
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('view', e)}>
                            📄 View Accommodation
                        </button>
                    </li>
                </ul>
            </div>

            {/* Room Types Dropdown */}
            <div className="dropdown mb-3">
                <button
                    className="btn btn-secondary dropdown-toggle w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    style={{ backgroundColor: '#2b2b3d', borderColor: '#2b2b3d' }}
                >
                    🛌 Room Types
                </button>
                <ul className="dropdown-menu w-100">
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('createnewroomtype', e)}>
                            ➕ Create New Room Type
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('viewroomtypes', e)}>
                            📄 View Room Types
                        </button>
                    </li>
                </ul>
            </div>

            {/* Room Dropdown */}
            <div className="dropdown mb-3">
                <button
                    className="btn btn-secondary dropdown-toggle w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    style={{ backgroundColor: '#2b2b3d', borderColor: '#2b2b3d' }}
                >
                    🛌 Room
                </button>
                <ul className="dropdown-menu w-100">
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('createRoom', e)}>
                            ➕ Create New Room
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('viewRooms', e)}>
                            📄 View All Rooms
                        </button>
                    </li>
                </ul>
            </div>

            {/* Accommodation Request */}
            <div className="dropdown mb-3">
                <button
                    className="btn btn-secondary dropdown-toggle w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    style={{ backgroundColor: '#2b2b3d', borderColor: '#2b2b3d' }}
                >
                    🛌 Accommodation Request
                </button>
                <ul className="dropdown-menu w-100">
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('viewAllRequests', e)}>
                            📄 View All Requests
                        </button>
                    </li>
                </ul>
            </div>

            {/* Create Room Allocations */}
            <div className="dropdown mb-3">
                <button
                    className="btn btn-secondary dropdown-toggle w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    style={{ backgroundColor: '#2b2b3d', borderColor: '#2b2b3d' }}
                >
                    🛌 Room Allocations
                </button>
                <ul className="dropdown-menu w-100">
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('createRoomAllocation', e)}>
                            ➕ Create Room Allocation
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('viewRoomAllocations', e)}>
                            📄 View Room Allocations
                        </button>
                    </li>
                </ul>
            </div>

            {/* Event Categories */}
            <div className="dropdown mb-3">
                <button
                    className="btn btn-secondary dropdown-toggle w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    style={{ backgroundColor: '#2b2b3d', borderColor: '#2b2b3d' }}
                >
                    🛌 Event Categories
                </button>
                <ul className="dropdown-menu w-100">
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('createEventCategory', e)}>
                            ➕ Create Event Category
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('viewEventCategories', e)}>
                            📄 View Event Categories
                        </button>
                    </li>
                </ul>
            </div>

            {/* Events */}
            <div className="dropdown mb-3">
                <button
                    className="btn btn-secondary dropdown-toggle w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    style={{ backgroundColor: '#2b2b3d', borderColor: '#2b2b3d' }}
                >
                    🛌 Events
                </button>
                <ul className="dropdown-menu w-100">
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('createEvent', e)}>
                            ➕ Create Event
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('viewEvents', e)}>
                            📄 View Events
                        </button>
                    </li>
                </ul>
            </div>

            {/* Venues */}
            <div className="dropdown mb-3">
                <button
                    className="btn btn-secondary dropdown-toggle w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    style={{ backgroundColor: '#2b2b3d', borderColor: '#2b2b3d' }}
                >
                    🛌 Venues
                </button>
                <ul className="dropdown-menu w-100">
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('createVenue', e)}>
                            ➕ Create Venue
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={(e) => handleMenuItemClick('viewVenues', e)}>
                            📄 View Venues
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default AdminDashboard;
