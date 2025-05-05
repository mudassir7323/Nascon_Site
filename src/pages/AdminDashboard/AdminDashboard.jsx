import React, { useState, useEffect } from 'react';
import CreateAccommodation from './create/CreateAccomodation';
import ViewAccommodation from './view/ViewAccomodation';
import CreateRoom from './create/CreateRoom';
import ViewRooms from './view/ViewRooms';
import CreateNewRoomType from './create/CreateNewRoomType';
import ViewRoomTypes from './view/ViewRoomTypes';
import ViewAllRequests from './view/ViewAllRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CreateRoomAllocation from './create/CreateRoomAllocation';
import ViewRoomAllocations from './view/ViewRoomAllocations';
import CreateEventCategory from './create/CreateEventCategory';
import ViewEventCategories from './view/ViewEventCategories';
import CreateVenue from './create/CreateVenue';
import ViewVenues from './view/ViewVenues';
import CreateEvent from './create/CreateEvent';
import ViewEvents from './view/ViewEvents';
import './AdminDashboard.css';
import CreateEventSchedule from './create/CreateEventSchedule';
import ViewEventSchedules from './view/ViewEventSchedules';
import ViewTeams from './view/ViewTeams';
import ViewPayments from './view/ViewPayments';

function AdminDashboard() {
    const [activeComponent, setActiveComponent] = useState(() => 'create'); // Initialize with 'create'
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [currentSection, setCurrentSection] = useState('accommodation');

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

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
                return <ViewEvents />;
            case 'createEventSchedule':
                return <CreateEventSchedule />;
            case 'viewEventSchedules':
                return <ViewEventSchedules />;
            case 'viewTeams':
                return <ViewTeams />;
            case 'viewPayments':
                return <ViewPayments />;
            default:
                return <h4 className="text-center">Please select an option</h4>;
        }
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} style={{
                width: sidebarCollapsed ? '80px' : '280px',
                minHeight: '100vh',
                transition: 'width 0.3s ease',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                overflowX: 'hidden',
                position: 'relative',
                zIndex: 1000
            }}>
                <Sidebar
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    sidebarCollapsed={sidebarCollapsed}
                    currentSection={currentSection}
                    setCurrentSection={setCurrentSection}
                />
            </div>

            {/* Main Content */}
            <div className="content flex-grow-1" style={{ backgroundColor: '#f8f9fa' }}>
                {/* Top Navbar */}
                <div className="navbar sticky-top bg-white shadow-sm py-2 px-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <button
                            className="btn border-0"
                            onClick={toggleSidebar}
                            style={{ marginRight: '15px', color: '#495057' }}
                        >
                            {!sidebarCollapsed ? <i className="bi bi-chevron-left"></i> : <i className="bi bi-chevron-right"></i>}
                        </button>
                        <h5 className="mb-0" style={{ color: '#3a506b', fontWeight: '500' }}>Management Dashboard</h5>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="dropdown">
                            <button className="btn dropdown-toggle d-flex align-items-center"
                                type="button"
                                id="userDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    borderColor: '#e9ecef',
                                    color: '#495057'
                                }}
                            >
                                <div className="me-2 rounded-circle d-flex justify-content-center align-items-center"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        backgroundColor: '#e9ecef',
                                        color: '#495057'
                                    }}
                                >
                                    <i className="bi bi-person"></i>
                                </div>
                                <span>Admin</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown" style={{ borderColor: '#e9ecef', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)' }}>
                                <li><a className="dropdown-item" href="#" style={{ color: '#495057' }}>Profile</a></li>
                                <li><a className="dropdown-item" href="#" style={{ color: '#495057' }}>Settings</a></li>
                                <li><hr className="dropdown-divider" style={{ borderColor: '#e9ecef' }} /></li>
                                <li><a className="dropdown-item" href="#" style={{ color: '#495057' }}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="container-fluid p-4">
                    {renderContent()}
                </div>
            </div>

            {/* Mobile Offcanvas Sidebar */}
            <div
                className="offcanvas offcanvas-start d-md-none"
                tabIndex="-1"
                id="sidebarOffcanvas"
                aria-labelledby="sidebarOffcanvasLabel"
                style={{ backgroundColor: '#ffffff' }}
            >
                <div className="offcanvas-header">
                    <h5 id="sidebarOffcanvasLabel" className="text-primary">Dashboard Menu</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <Sidebar
                        activeComponent={activeComponent}
                        setActiveComponent={setActiveComponent}
                        sidebarCollapsed={false}
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                    />
                </div>
            </div>
        </div>
    );
}

function Sidebar({ activeComponent, setActiveComponent, sidebarCollapsed, currentSection, setCurrentSection }) {
    // Initialize activeItem with the current activeComponent from parent
    const [activeItem, setActiveItem] = useState(activeComponent || 'create');

    // Update activeItem when activeComponent changes
    useEffect(() => {
        setActiveItem(activeComponent);
    }, [activeComponent]);

    const handleMenuItemClick = (component, event) => {
        event.stopPropagation();
        setActiveComponent(component);
        setActiveItem(component);

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

    const toggleSection = (section) => {
        if (currentSection === section) {
            setCurrentSection('');
        } else {
            setCurrentSection(section);
        }
    };

    // Find which section contains the active component
    const findSectionForComponent = (componentId) => {
        for (const section of menuSections) {
            if (section.items.some(item => item.id === componentId)) {
                return section.id;
            }
        }
        return null;
    };

    // Set the current section based on the active component when component mounts
    useEffect(() => {
        const sectionId = findSectionForComponent(activeItem);
        if (sectionId && currentSection !== sectionId) {
            setCurrentSection(sectionId);
        }
    }, [activeItem]);

    // Define menu structure for cleaner rendering
    const menuSections = [
        {
            id: 'accommodation',
            title: 'Accommodation',
            items: [
                { id: 'create', title: 'Create Accommodation' },
                { id: 'view', title: 'View Accommodation' }
            ]
        },
        {
            id: 'requests',
            title: 'Accommodation Requests',
            items: [
                { id: 'viewAllRequests', title: 'View All Requests' }
            ]
        },
        {
            id: 'roomTypes',
            title: 'Room Types',
            items: [
                { id: 'createnewroomtype', title: 'Create New Room Type' },
                { id: 'viewroomtypes', title: 'View Room Types' }
            ]
        },
        {
            id: 'rooms',
            title: 'Rooms',
            items: [
                { id: 'createRoom', title: 'Create New Room' },
                { id: 'viewRooms', title: 'View All Rooms' }
            ]
        },
        {
            id: 'allocations',
            title: 'Room Allocations',
            items: [
                { id: 'viewRoomAllocations', title: 'View Room Allocations' }
            ]
        },
        {
            id: 'eventCategories',
            title: 'Event Categories',
            items: [
                { id: 'createEventCategory', title: 'Create Event Category' },
                { id: 'viewEventCategories', title: 'View Event Categories' }
            ]
        },
        {
            id: 'events',
            title: 'Events',
            items: [
                { id: 'viewEvents', title: 'View Events' }
            ]
        },
        {
            id: 'venues',
            title: 'Venues',
            items: [
                { id: 'createVenue', title: 'Create Venue' },
                { id: 'viewVenues', title: 'View Venues' }
            ]
        },
        {
            id: 'eventSchedules',
            title: 'Event Schedules',
            items: [
                { id: 'createEventSchedule', title: 'Create Schedule' },
                { id: 'viewEventSchedules', title: 'View Schedule' }
            ]
        },
        {
            id: 'teams',
            title: 'Teams',
            items: [
                { id: 'viewTeams', title: 'View Teams' }
            ]
        },
        {
            id: 'payments',
            title: 'Payments',
            items: [
                { id: 'viewPayments', title: 'View Payments' }
            ]
        }
    ];

    return (
        <div className="d-flex flex-column h-100">
            {/* Logo and Brand */}
            <div className="d-flex align-items-center justify-content-center py-4 border-bottom">
                {sidebarCollapsed ? (
                    <div className="rounded-circle bg-light d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px', border: '1px solid #dee2e6' }}>
                        <i className="bi bi-person" style={{ fontSize: '18px', color: '#3a506b' }}></i>
                    </div>
                ) : (
                    <div className="d-flex align-items-center">
                        <div className="rounded-circle d-flex justify-content-center align-items-center me-2"
                            style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#3a506b',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                            <i className="bi bi-person-fill" style={{ fontSize: '20px', color: '#ffffff' }}></i>
                        </div>
                        <h4 className="mb-0" style={{ color: '#3a506b', fontWeight: '600' }}>Admin Panel</h4>
                    </div>
                )}
            </div>

            {/* Navigation Menu */}
            <div className="sidebar-menu py-3 overflow-auto" style={{ scrollbarWidth: 'thin' }}>
                {menuSections.map((section) => (
                    <div key={section.id} className="mb-1">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className={`btn d-flex align-items-center w-100 py-2 px-3 text-start border-0 section-header ${currentSection === section.id ? 'active' : ''}`}
                            style={{
                                borderRadius: '0',
                                marginBottom: '2px',
                                color: '#495057'
                            }}
                        >
                            {!sidebarCollapsed && (
                                <>
                                    <span className="flex-grow-1">{section.title}</span>
                                    <span className="ms-2">
                                        <i className={`bi ${currentSection === section.id ? 'bi-chevron-down' : 'bi-chevron-right'} chevron-icon ${currentSection === section.id ? 'open' : ''}`}></i>
                                    </span>
                                </>
                            )}
                        </button>

                        {/* Section Items */}
                        {!sidebarCollapsed && (
                            <div className={`ps-4 mt-1 submenu ${currentSection === section.id ? 'open' : ''}`}>
                                {section.items.map((item) => (
                                    <button
                                        key={item.id}
                                        className={`btn btn-sm d-flex align-items-center w-100 py-2 px-3 text-start border-0 menu-item ${activeItem === item.id ? 'active' : ''}`}
                                        onClick={(e) => handleMenuItemClick(item.id, e)}
                                        style={{
                                            borderRadius: '0',
                                            color: '#6c757d',
                                            fontWeight: '400'
                                        }}
                                    >
                                        <span className="ms-2">{item.title}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer */}
            {!sidebarCollapsed && (
                <div className="mt-auto border-top p-3 text-center">
                    <small style={{ color: '#8898aa' }}>© 2025 Admin System</small>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
