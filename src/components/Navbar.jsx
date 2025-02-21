import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import Login from "./Login";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  return (
    <nav className="bg-gray-900 text-white flex px-10 py-4 justify-between items-center">
      {/* Company Name */}
      <div className="text-xl font-bold">TH</div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        <FaUserCircle className="text-3xl" />
        <p>{user?.displayName}</p>
        {user ? (
          <button
            onClick={logOut}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <Login />
        )}
      </div>
    </nav>
  );
}
