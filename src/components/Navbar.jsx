import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./DarkMode/ThemeToggle";
import "../index.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/activityLog", label: "Activity Log" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Company Name (Hidden on Mobile) */}
          <div className="text-2xl font-bold text-blue-400 hidden sm:block">
            TaskHandler
          </div>

          {/* Hamburger Icon for Mobile */}
          <button
            onClick={toggleMenu}
            className="sm:hidden focus:outline-none hover:opacity-80 transition-opacity"
          >
            {isMenuOpen ? (
              <FaTimes className="text-2xl text-blue-400" />
            ) : (
              <FaBars className="text-2xl text-blue-400" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-blue-700 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* User & Theme Toggle Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Profile Picture for Desktop */}
                <div className="hidden sm:flex items-center gap-4">
                  <img
                    className="rounded-full h-10 w-10 border-2 border-blue-400 hover:border-blue-500 transition-all"
                    src={user?.photoURL}
                    alt="Profile"
                  />
                  <button
                    onClick={logOut}
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt className="inline mr-2" /> Logout
                  </button>
                </div>

                {/* Profile Picture for Mobile */}
                <div className="sm:hidden">
                  <img
                    className="rounded-full h-10 w-10 border-2 border-blue-400 hover:border-blue-500 transition-all"
                    src={user?.photoURL}
                    alt="Profile"
                  />
                </div>
              </>
            ) : (
              <div className="hidden sm:block">
                <Login />
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden absolute right-4 top-16 bg-gray-700 rounded-lg shadow-lg w-48 animate-slideDown">
            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-300 hover:bg-blue-600 hover:text-white"
                    }`
                  }
                  onClick={toggleMenu}
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Logout Button for Mobile */}
              {user && (
                <button
                  onClick={logOut}
                  className="flex items-center w-fit bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors mt-2"
                >
                  <FaSignOutAlt className="inline mr-2" /> Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
