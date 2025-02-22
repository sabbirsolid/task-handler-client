import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import "../index.css";

const ActivityLog = () => {
  const { user, loading } = useContext(AuthContext);
  const {
    data: history,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["history", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `https://task-handler-server.vercel.app/getHistory/${user.email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      return response.json();
    },
  });

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `https://task-handler-server.vercel.app/history/${id}`
    );
    if (res.data.deletedCount > 0) {
      toast.success("Deleted Successfully");
      refetch();
    }
  };

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BeatLoader color="#2563EB" size={12} />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 min-h-screen max-w-4xl mx-auto animate-slideDown">
      <h2 className="text-3xl font-bold text-center mb-6">Activity Log</h2>

      {/* Simple List Layout */}
      {history && (
        <ul className="space-y-6">
          {history.map((log, index) => (
            <li key={index} className="border-b pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                {/* Action & Timestamp */}
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full w-fit uppercase tracking-wide ${
                    log.action === "add"
                      ? "bg-green-100 text-green-700"
                      : log.action === "update"
                      ? "bg-blue-100 text-blue-700"
                      : log.action === "edit"
                      ? "bg-purple-100 text-purple-700"
                      : log.action === "delete"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                </span>
                <span className="text-xs text-gray-500">
                  {format(new Date(log.timestamp), "MMM dd, yyyy - hh:mm a")}
                </span>
              </div>

              {/* Task Details */}
              <div className="">
                {log.details?.title && (
                  <h3 className="text-lg font-semibold">{log.details.title}</h3>
                )}
                {log.details?.category && (
                  <p className="text-sm ">Category: {log.details.category}</p>
                )}
                {log.details?.description && (
                  <p className="text-sm mt-1">{log.details.description}</p>
                )}
                {log.details?.deadline && (
                  <p className="text-xs  mt-1">
                    Deadline:{" "}
                    {format(new Date(log.details.deadline), "MMM dd, yyyy")}
                  </p>
                )}
              </div>

              {/* Delete Button */}
              <button
                className="text-red-600 hover:text-red-700 text-sm mt-3 flex items-center gap-2"
                onClick={() => handleDelete(log._id)}
              >
                <FiTrash className="text-lg" /> Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLog;
