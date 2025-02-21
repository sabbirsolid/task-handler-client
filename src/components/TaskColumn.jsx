// import { Draggable, Droppable } from "@hello-pangea/dnd";
// import axios from "axios";
// import PropTypes from "prop-types";
// import toast from "react-hot-toast";
// import { FiPlus } from "react-icons/fi";

// const TaskColumn = ({ title, tasks, droppableId, openModal, refetch }) => {
//   const handleDelete = async (id) => {
//     const res = await axios.delete(`http://localhost:5000/deleteTask/${id}`);
//     if (res.data.deletedCount > 0) {
//       refetch();
//       toast.success("Deleted Successfully");
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">{title}</h2>
//         <button
//           onClick={openModal}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           <FiPlus className="inline-block mr-1" />
//           Add Task
//         </button>
//       </div>
//       <Droppable droppableId={droppableId}>
//         {(provided) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             className="space-y-4"
//           >
//             {tasks.map((task, index) => (
//               <Draggable key={task._id} draggableId={task._id} index={index}>
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     className="p-4 border rounded shadow-lg"
//                   >
//                     <h3 className="font-medium">{task.title}</h3>
//                     <p className="text-gray-600">{task.description}</p>
//                     <button
//                       className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
//                       onClick={() => handleDelete(task._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// };

// TaskColumn.propTypes = {
//   title: PropTypes.string.isRequired,
//   tasks: PropTypes.array.isRequired,
//   droppableId: PropTypes.string.isRequired,
//   openModal: PropTypes.func.isRequired,
//   refetch: PropTypes.func.isRequired,
// };

// export default TaskColumn;

import { Draggable, Droppable } from "@hello-pangea/dnd";
import axios from "axios";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";

const TaskColumn = ({ title, tasks, droppableId, openModal, refetch }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/deleteTask/${id}`);
    if (res.data.deletedCount > 0) {
      refetch();
      toast.success("Deleted Successfully");
    }
  };

  const openEditModal = (task) => {
    setEditTask(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditTask(null);
  };

  const handleUpdateTask = async () => {
    if (!editTask.title || !editTask.description) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await axios.patch(`http://localhost:5000/updateTaskInfo/${editTask._id}`, {
        title: editTask.title,
        description: editTask.description,
      });

      toast.success("Task updated successfully!");
      refetch();
      closeEditModal();
    } catch (error) {
      toast.error("Failed to update task", error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          <FiPlus className="inline-block mr-1" />
          Add Task
        </button>
      </div>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4"
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-4 border rounded shadow-lg"
                  >
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded"
                        onClick={() => openEditModal(task)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Edit Task Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
              placeholder="Task Name"
              className="w-full p-2 border rounded mb-3"
            />
            <textarea
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
              placeholder="Short Description"
              className="w-full p-2 border rounded mb-3"
            />
            <div className="flex justify-end">
              <button
                onClick={closeEditModal}
                className="mr-2 px-4 py-2 bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTask}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TaskColumn.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  droppableId: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default TaskColumn;
