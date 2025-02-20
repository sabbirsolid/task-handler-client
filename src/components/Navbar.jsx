import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Company Name */}
      <div className="text-xl font-bold">Company Name</div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        <FaUserCircle className="text-3xl" />
        <p>{user?.displayName}</p>
        {user && (
          <button
            onClick={logOut}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
