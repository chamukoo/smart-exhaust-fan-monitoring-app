import React, { useState, useEffect } from 'react';
import { Link, useLocation, Route, Routes } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import Login from '../pages/Login';

const UserContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Close the dropdown menu when the route changes
    setIsOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error during sign-out:', error.message);
        alert('An error occurred while logging out. Please try again.');
        return;
      }
      setLoggedOut(true); // Trigger redirection to login
    } catch (error) {
      console.error('Unexpected error during sign-out:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  if (loggedOut) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="relative">
      {/* Profile Image */}
      <div
        className="relative group rounded-full flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 cursor-pointer"
        onClick={toggleDropdown}
      >
        <img
          src="PUPLogo.png"
          alt="User"
          className="rounded-full object-contain w-full h-full"
        />

        <div className="absolute inset-0 rounded-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-sm font-semibold"></span>
        </div>

        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Profile Settings
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserContainer;
