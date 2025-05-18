import React, { useContext, useState } from "react";
import assets from "../assets/assets.js";
import { FutureContext } from "../context/FutureContext.jsx";

const Navbar = () => {
  const {token, userName, handleLogout } =
    useContext(FutureContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  return (
    <nav className="bg-[#000000]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo and Navigation Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <a href="/" className="flex shrink-0 items-center">
              <img className="h-10 w-auto" src={assets.logo} alt="Your Company" />
            </a>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="/dashboard"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                  aria-current="page"
                >
                  Dashboard
                </a>
                <a
                  href="/internship"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Internships
                </a>
                <a
                  href="/about"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Developers
                </a>
              </div>
            </div>
          </div>

          {/* User Profile or Login Button */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {token ? (
              <div className="relative ml-3">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={assets.profile}
                    alt=""
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-sm bg-black py-1 shadow-lg ring-1 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <p
                      className="block px-4 py-2 text-sm text-white"
                      role="menuitem"
                    >
                      Hi, {userName}
                    </p>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      role="menuitem"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <a
            href="/dashboard"
            className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="/internship"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Internship
          </a>
          <a
            href="/about"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            About
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;