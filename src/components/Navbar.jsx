import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Login from "./Login";
import { FaSignOutAlt } from "react-icons/fa";
import ThemeToggle from "./DarkMode/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Company Name */}
          <div className="text-2xl font-bold text-blue-400">TH</div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Profile Photo and Dropdown for Mobile */}
                <div className="relative sm:hidden">
                  <button
                    onClick={toggleMenu}
                    className="focus:outline-none hover:opacity-80 transition-opacity"
                  >
                    <img
                      className="rounded-full h-10 w-10 border-2 border-blue-400"
                      src={user?.photoURL}
                      alt="Profile"
                    />
                  </button>
                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-2 mt-2 w-48 rounded-lg shadow-lg">
                      <button
                        onClick={logOut}
                        className="block w-fit text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                      >
                        <FaSignOutAlt className="inline mr-1" /> Logout
                        {/* Logout icon */}
                      </button>
                    </div>
                  )}
                </div>

                {/* Desktop View */}
                <div className="hidden sm:flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <img
                      className="rounded-full h-10 w-10 border-2 border-blue-400"
                      src={user?.photoURL}
                      alt="Profile"
                    />
                    {/* <p className="text-gray-200">{user?.displayName}</p> */}
                  </div>
                  <button
                    onClick={logOut}
                    className="flex items-center  bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt className="inline mr-2" /> Logout
                    {/* Logout icon */}
                  </button>
                </div>
              </>
            ) : (
              <>
 
                <div className="sm:hidden">
                  <Login />
                </div>

                {/* Desktop View */}
                <div className="hidden sm:block">
                  <Login />
                </div>
              </>
            )}
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
