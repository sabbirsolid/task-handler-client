import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { BeatLoader } from "react-spinners";
import "../index.css";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BeatLoader color="#2563EB" size={10} />
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8 animate-slideDown">
      <div className="max-w-3xl mx-auto  rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="  p-6">
          <h1 className="text-2xl md:text-3xl text-center font-bold  mb-4 md:mb-6">
            Profile
          </h1>
        </div>

        {/* Profile Content */}
        {user && (
          <div className="p-6 task-card">
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Details */}
              <div className="text-center">
                <h2 className="text-2xl font-semibold ">
                  {user?.displayName || "User"}
                </h2>
                <p className=" mt-2">{user?.email}</p>

                {/* Additional Details (Optional) */}
                <div className="mt-4">
                  <p className="">
                    <span className="font-medium">Joined:</span>{" "}
                    {new Date(
                      user?.metadata?.creationTime
                    ).toLocaleDateString()}
                  </p>
                  <p className="">
                    <span className="font-medium">Last Login:</span>{" "}
                    {new Date(
                      user?.metadata?.lastSignInTime
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
