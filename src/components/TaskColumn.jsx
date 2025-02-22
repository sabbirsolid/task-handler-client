// import { Draggable, Droppable } from "@hello-pangea/dnd";
// import axios from "axios";
// import PropTypes from "prop-types";
// import toast from "react-hot-toast";
// import { useContext, useState } from "react";
// import { FiTrash, FiEdit } from "react-icons/fi";
// import { AuthContext } from "../Provider/AuthProvider";
// import { format } from "date-fns";

// const TaskColumn = ({ tasks, droppableId, refetch }) => {
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editTask, setEditTask] = useState(null);
//   const { user } = useContext(AuthContext);

//   const handleDelete = async (id) => {
//     const res = await axios.delete(`http://localhost:5000/deleteTask/${id}`);
//     if (res.data.deletedCount > 0) {
//       refetch();
//       toast.success("Deleted Successfully");
//     }
//   };

//   const openEditModal = (task) => {
//     setEditTask(task);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setIsEditModalOpen(false);
//     setEditTask(null);
//   };

//   const handleUpdateTask = async () => {
//     if (!editTask.title || !editTask.description) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     try {
//       await axios.patch(
//         `http://localhost:5000/updateTaskInfo/${editTask._id}`,
//         {
//           title: editTask.title,
//           description: editTask.description,
//         }
//       );

//       toast.success("Task updated successfully!");
//       refetch();
//       closeEditModal();
//     } catch (error) {
//       toast.error("Failed to update task", error.message);
//     }
//   };

//   return (
//     <div>
//       <Droppable droppableId={droppableId}>
//         {(provided) =>
//           user && (
//             <div
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//               className="space-y-4"
//             >
//               {tasks?.length === 0 ? (
//                 <>
//                   <p className="text-center">Add a task</p>
//                 </>
//               ) : (
//                 <>
//                   {tasks?.map((task, index) => (
//                     <Draggable
//                       key={task._id}
//                       draggableId={task._id}
//                       index={index}
//                     >
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="p-4 border task-card  rounded-xl shadow-md  hover:shadow-lg transition-all flex flex-col gap-3"
//                         >
//                           {/* Task Content */}
//                           <div>
//                             <h3 className="text-lg font-semibold ">
//                               {task?.title}
//                             </h3>
//                             <p className="text-sm font-medium mt-2 px-2 py-1 w-fit rounded-lg bg-green-100 text-green-700 shadow-sm">
//                               {task?.category}
//                             </p>
//                             <p className=" text-sm mt-2 text-justify">
//                               {task?.description}
//                             </p>
//                           </div>

//                           {/* Bottom Section - Buttons */}
//                           <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-3 p-4 border-t mt-4 pt-3  rounded-lg shadow-sm">
//                             {/* Date Information */}
//                             <div className="text-xs ">
//                               <p>
//                                 <span className="font-medium">
//                                   Added at:{" "}
//                                 </span>
//                                 {task?.addedTime
//                                   ? format(
//                                       new Date(task.addedTime),
//                                       "EEEE, MMM dd, yyyy - hh:mm a"
//                                     )
//                                   : "Not available"}
//                               </p>
//                               <p>
//                                 <span className="font-medium ">
//                                   Updated at:{" "}
//                                 </span>
//                                 {task?.modifiedTime
//                                   ? format(
//                                       new Date(task.modifiedTime),
//                                       "EEEE, MMM dd, yyyy - hh:mm a"
//                                     )
//                                   : "Not available"}
//                               </p>
//                             </div>

//                             {/* Action Buttons */}
//                             <div className="flex gap-3">
//                               <button
//                                 className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all"
//                                 onClick={() => openEditModal(task)}
//                               >
//                                 <FiEdit className="text-lg" />
//                               </button>
//                               <button
//                                 className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-all"
//                                 onClick={() => handleDelete(task._id)}
//                               >
//                                 <FiTrash className="text-lg" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                 </>
//               )}
//               {provided.placeholder}
//             </div>
//           )
//         }
//       </Droppable>

//       {isEditModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center modal-overlay p-4">
//           <div className="modal-container p-6 md:p-8 w-full max-w-md md:max-w-lg">
//             {/* Modal Header */}
//             <h2 className="modal-header mb-5">Edit Task</h2>

//             {/* Task Name Input */}
//             <input
//               type="text"
//               value={editTask.title}
//               onChange={(e) =>
//                 setEditTask({ ...editTask, title: e.target.value })
//               }
//               placeholder="Task Name"
//               className="modal-input mb-4"
//             />

//             {/* Task Description Textarea */}
//             <textarea
//               value={editTask.description}
//               onChange={(e) =>
//                 setEditTask({ ...editTask, description: e.target.value })
//               }
//               placeholder="Short Description"
//               className="modal-textarea mb-4"
//             />

//             {/* Modal Buttons */}
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={closeEditModal}
//                 className="modal-button-cancel px-5 py-2 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdateTask}
//                 className="modal-button-primary px-5 py-2 rounded-lg"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
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
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import EditModal from "./EditModal";
import TaskCard from "./TaskCard";

const TaskColumn = ({ tasks, droppableId, refetch }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const { user } = useContext(AuthContext);

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
      await axios.patch(
        `http://localhost:5000/updateTaskInfo/${editTask._id}`,
        {
          title: editTask.title,
          description: editTask.description,
        }
      );

      toast.success("Task updated successfully!");
      refetch();
      closeEditModal();
    } catch (error) {
      toast.error("Failed to update task", error.message);
    }
  };

  return (
    <div>
      <Droppable droppableId={droppableId}>
        {(provided) =>
          user && (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-4"
            >
              {tasks?.length === 0 ? (
                <p className="text-center">Add a task</p>
              ) : (
                <>
                  {tasks?.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <TaskCard
                          task={task}
                          provided={provided}
                          openEditModal={openEditModal}
                          handleDelete={handleDelete}
                        />
                      )}
                    </Draggable>
                  ))}
                </>
              )}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>

      {isEditModalOpen && (
        <EditModal
          editTask={editTask}
          setEditTask={setEditTask}
          closeEditModal={closeEditModal}
          handleUpdateTask={handleUpdateTask}
        />
      )}
    </div>
  );
};

// PropTypes Validation
TaskColumn.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  droppableId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default TaskColumn;
