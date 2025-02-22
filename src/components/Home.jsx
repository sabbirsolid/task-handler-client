import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DragDropContext } from "@hello-pangea/dnd";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import TaskColumn from "./TaskColumn";
import { FiPlus } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import "../index.css";

const Home = () => {
  const { user, loading } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: tasks = { todo: [], "in-progress": [], done: [] },
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      if (!user?.email) {
        toast.error("User email is not available.");
        return { todo: [], "in-progress": [], done: [] };
      }

      const email = user.email;
      const res = await axios.get(
        `http://localhost:5000/getTasks?email=${email}`
      );
      const fetchedTasks = res.data;

      const sortedTasks = {
        todo: fetchedTasks
          .filter((task) => task.category === "todo")
          .sort((a, b) => a.position - b.position),
        "in-progress": fetchedTasks
          .filter((task) => task.category === "in-progress")
          .sort((a, b) => a.position - b.position),
        done: fetchedTasks
          .filter((task) => task.category === "done")
          .sort((a, b) => a.position - b.position),
      };
      return sortedTasks;
    },
    enabled: !!user?.email,
  });

  const addTaskMutation = useMutation({
    mutationFn: async (newTask) => {
      const taskWithUserEmail = {
        ...newTask,
        email: user.email,
      };
      const res = await axios.post(
        "http://localhost:5000/addTask",
        taskWithUserEmail
      );
      return res.data.task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success("Task added successfully!");
      closeModal();
    },
    onError: () => toast.error("Failed to add task"),
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, category, position }) => {
      await axios.patch(`http://localhost:5000/updateTask/${taskId}`, {
        category,
        position,
        email: user?.email
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success("Task moved successfully!");
      refetch();
    },
    onError: () => toast.error("Failed to move task"),
  });

  const reorderTasksMutation = useMutation({
    mutationFn: async ({ email, category, tasks }) => {
      await axios.patch("http://localhost:5000/reorderTasks", {
        email,
        category,
        tasks,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success("Tasks reordered successfully!");
    },
    onError: () => toast.error("Failed to reorder tasks"),
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const startColumn = source.droppableId;
    const endColumn = destination.droppableId;

    if (startColumn === endColumn && source.index === destination.index) return;

    const movedTask = tasks[startColumn][source.index];

    // Create a deep copy of the tasks to update positions correctly
    const newTasks = { ...tasks };
    const updatedColumnTasks = [...newTasks[startColumn]];

    // Remove the task from its original position
    updatedColumnTasks.splice(source.index, 1);

    // Insert the task at the new position
    updatedColumnTasks.splice(destination.index, 0, movedTask);

    // Reassign correct positions
    const reorderedTasks = updatedColumnTasks.map((task, index) => ({
      ...task,
      position: index,
    }));

    // Update query cache optimistically
    queryClient.setQueryData(["tasks"], (oldData) => ({
      ...oldData,
      [startColumn]: reorderedTasks,
    }));

    if (startColumn === endColumn) {
      // If moving within the same category, update order
      reorderTasksMutation.mutate({
        email: user.email,
        category: startColumn,
        tasks: reorderedTasks, // Correctly ordered tasks
      });
    } else {
      // If moving to a different category, update category and position
      updateTaskMutation.mutate({
        taskId: movedTask._id,
        category: endColumn,
        position: destination.index,
      });
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "todo",
  });

  const openModal = () => {
    setNewTask({
      title: "",
      description: "",
      category: "todo",
    });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description) {
      toast.error("Please fill in all fields");
      return;
    }
    addTaskMutation.mutate(newTask);
  };

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BeatLoader color="#2563EB" size={10} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 animate-slideDown">
      <Toaster position="top-right" />

      <h1 className="text-2xl md:text-3xl text-center font-bold  mb-4 md:mb-6">
        Task Management
      </h1>
      <p className="mb-2 text-center">NB: Drag and Drop to change category</p>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Add Task Button */}
        <div className="flex justify-center  mb-6">
          <button
            disabled={!user}
            onClick={openModal}
            className={`flex items-center gap-2 px-5 py-3 text-white font-medium rounded-lg shadow-lg transition-all
    ${
      user ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
    }`}
          >
            {user ? <FiPlus className="text-lg" /> : ""}
            {user ? "Add Task" : "Sign In to Add Task"}
          </button>
        </div>

        {/* Task Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 h-fit border rounded-xl shadow-lg bg-gray-100 task-card">
            <h2 className="text-lg md:text-xl text-center font-semibold mb-4 px-4 py-2  rounded-lg bg-gray-200 task-card shadow-lg">
              To Do
            </h2>
            <TaskColumn
              tasks={tasks.todo}
              droppableId="todo"
              openModal={openModal}
              refetch={refetch}
            />
          </div>

          <div className="p-4 h-fit border rounded-xl shadow-lg bg-gray-100 task-card">
            <h2 className="text-lg md:text-xl text-center font-semibold mb-4 px-4 py-2  rounded-lg bg-gray-200 task-card shadow-lg">
              In Progress
            </h2>
            <TaskColumn
              tasks={tasks["in-progress"]}
              droppableId="in-progress"
              openModal={openModal}
              refetch={refetch}
            />
          </div>

          <div className="p-4 h-fit border rounded-xl shadow-lg bg-gray-100 task-card">
            <h2 className="text-lg md:text-xl text-center font-semibold mb-4 px-4 py-2  rounded-lg bg-gray-200 task-card shadow-lg">
              Done
            </h2>
            <TaskColumn
              tasks={tasks.done}
              droppableId="done"
              openModal={openModal}
              refetch={refetch}
            />
          </div>
        </div>
      </DragDropContext>

      

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center modal-overlay p-4 animate-slideDown">
          <div className="modal-container p-6 md:p-8 w-full max-w-md md:max-w-lg">
            {/* Modal Header */}
            <h2 className="modal-header mb-5">Add Task</h2>

            {/* Task Name Input */}
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Task Name"
              className="modal-input mb-4"
            />

            {/* Task Description Textarea */}
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Short Description"
              className="modal-textarea mb-4"
              rows="4"
            />

            <h1>Deadline</h1>
            <input
              type="date"
              name="deadline"
              value={newTask.deadline}
              onChange={handleInputChange}
              className="modal-input mb-4"
            />

            {/* Task Category Select */}
            <select
              name="category"
              value={newTask.category}
              onChange={handleInputChange}
              className="modal-select mb-6"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="modal-button-cancel px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="modal-button-primary px-5 py-2 rounded-lg"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
