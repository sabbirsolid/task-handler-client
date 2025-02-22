import { format } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
const TaskCard = ({ task, provided, openEditModal, handleDelete }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
  
    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };
  
    const words = task?.description?.split(" ") || [];
    const shortDescription = words.slice(0, 30).join(" ") + (words.length > 30 ? "..." : "");
  
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="p-4 border task-card rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col gap-3"
      >
        {/* Task Content */}
        <div>
          <h3 className="text-lg font-semibold">{task?.title}</h3>
          <p className="text-sm font-medium mt-2 px-2 py-1 w-fit rounded-lg bg-green-100 text-green-700 shadow-sm">
            {task?.category}
          </p>
  
          {/* Description with "Read More" */}
          <p className="text-sm mt-2 text-justify">
            {showFullDescription ? task?.description : shortDescription} {"  "}
            {words.length > 20 && (
            <span
              onClick={toggleDescription}
              className="text-blue-600 font-semibold hover:underline mt-1"
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </span>
          )}
          </p>
          
        </div>
  
        {/* Bottom Section - Buttons */}
        <div className="flex flex-wrap md:flex-nowrap justify-between lg:p-4 items-center gap-3  border-t mt-4 pt-3 rounded-lg shadow-sm">
          {/* Date Information */}
          <div className="text-xs">
            <p>
              <span className="font-medium">Added at: </span>
              {task?.addedTime
                ? format(new Date(task.addedTime), "EEEE, MMM dd, yyyy - hh:mm a")
                : "Not available"}
            </p>
            <p>
              <span className="font-medium">Updated at: </span>
              {task?.modifiedTime
                ? format(new Date(task.modifiedTime), "EEEE, MMM dd, yyyy - hh:mm a")
                : "N/A"}
            </p>
          </div>
  
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all"
              onClick={() => openEditModal(task)}
            >
              <FiEdit className="text-lg" />
            </button>
            <button
              className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-all"
              onClick={() => handleDelete(task._id)}
            >
              <FiTrash className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    );
  };
  TaskCard.propTypes = {
    task: PropTypes.object.isRequired,
    provided: PropTypes.object.isRequired,
    openEditModal: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
  };
  export default TaskCard;