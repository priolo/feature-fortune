import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css';
import UserCmp from './UserCmp';


const Layout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  return (
    <div className="layout">

      {/* Main Content */}
      <div className="main-wrapper">


        {/* Header */}
        <header className="header">

          <div className="header-left">
            <h1 className="page-title">Startup Web App</h1>
          </div>
          
          <div className="header-center">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="search-input"
              />
              <button type="submit" className="search-button">
                🔍
              </button>
            </form>
          </div>
          
          <div className="header-right">
            <UserCmp />
          </div>
          
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;