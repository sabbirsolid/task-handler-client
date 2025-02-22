import { Draggable, Droppable } from "@hello-pangea/dnd";
import axios from "axios";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import EditModal from "./EditModal";
import TaskCard from "./TaskCard";
import "../index.css";

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
          category: editTask.category,
          email: user?.email,
        }
      );
      refetch();
      toast.success("Task updated successfully!");
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
              className="space-y-4 "
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
