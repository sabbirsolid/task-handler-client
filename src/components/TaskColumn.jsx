import { Draggable, Droppable } from "@hello-pangea/dnd";
import axios from "axios";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";

// Task Column Component
const TaskColumn = ({ title, tasks, droppableId, openModal, refetch }) => {
  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/deleteTask/${id}`);
    if (res.data.deletedCount > 0) {
      refetch(); // Fetch the updated task list
      toast.success("Deleted Successfully");
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
                    <button
                      className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
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
