import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DragDropContext, } from "@hello-pangea/dnd";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";
import Navbar from "./Navbar";
import Login from "./Login";
import { AuthContext } from "../Provider/AuthProvider";
import TaskColumn from "./TaskColumn";

const Home = () => {
  const { user, loading } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Fetch tasks using TanStack Query
  // const { data: tasks = { todo: [], "in-progress": [], done: [] }, refetch, isLoading } =
  //   useQuery({
  //     queryKey: ["tasks"],
  //     queryFn: async () => {
  //       const email = user?.email;
  //       const res = await axios.get(
  //         `http://localhost:5000/getTasks?email=${email}`
  //       );
  //       const fetchedTasks = res.data;
  //       return {
  //         todo: fetchedTasks.filter((task) => task.category === "todo"),
  //         "in-progress": fetchedTasks.filter(
  //           (task) => task.category === "in-progress"
  //         ),
  //         done: fetchedTasks.filter((task) => task.category === "done"),
  //       };
  //     },
  //   });

  const { data: tasks = { todo: [], "in-progress": [], done: [] }, refetch, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      if (!user?.email) {
        toast.error("User email is not available.");
        return { todo: [], "in-progress": [], done: [] }; // Return empty tasks if no email
      }

      const email = user.email;
      const res = await axios.get(`http://localhost:5000/getTasks?email=${email}`);
      const fetchedTasks = res.data;
      return {
        todo: fetchedTasks.filter((task) => task.category === "todo"),
        "in-progress": fetchedTasks.filter((task) => task.category === "in-progress"),
        done: fetchedTasks.filter((task) => task.category === "done"),
      };
    },
    enabled: !!user?.email, // Only run the query if the email is available
  });

   

  // Mutation for adding a new task
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

  // Mutation for updating task category
  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, category }) => {
      await axios.patch(`http://localhost:5000/updateTask/${taskId}`, {
        category,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Refetch tasks after updating
      toast.success("Task moved successfully!");
      refetch();
    },
    onError: () => toast.error("Failed to move task"),
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const startColumn = source.droppableId;
    const endColumn = destination.droppableId;

    if (startColumn === endColumn && source.index === destination.index) return;

    const movedTask = tasks[startColumn][source.index];

    // Optimistically update UI before API call
    queryClient.setQueryData(["tasks"], (oldData) => {
      const newTasks = { ...oldData };
      newTasks[startColumn] = newTasks[startColumn].filter(
        (task, index) => index !== source.index
      );
      newTasks[endColumn] = [
        ...newTasks[endColumn].slice(0, destination.index),
        movedTask,
        ...newTasks[endColumn].slice(destination.index),
      ];

      return newTasks;
    });

    // Update backend
    updateTaskMutation.mutate(
      { taskId: movedTask._id, category: endColumn },
      {
        onError: () => {
          toast.error("Failed to move task");
          queryClient.invalidateQueries(["tasks"]);
        },
      }
    );
  };

  // Modal States
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

  // Handle Input Change
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add New Task
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
        <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <Toaster position="top-right" />
      <Navbar />
      <h1 className="text-4xl text-center font-bold text-gray-800 mb-8">
        Task Management
      </h1>

      {user && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskColumn
              title="To Do"
              tasks={tasks.todo}
              droppableId="todo"
              openModal={openModal}
              refetch={refetch}
            />
            <TaskColumn
              title="In Progress"
              tasks={tasks["in-progress"]}
              droppableId="in-progress"
              openModal={openModal}
              refetch={refetch}
            />
            <TaskColumn
              title="Done"
              tasks={tasks.done}
              droppableId="done"
              openModal={openModal}
              refetch={refetch}
            />
          </div>
        </DragDropContext>
      )}

      <Login />

      {/* Add Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Task Name"
              className="w-full p-2 border rounded mb-3"
            />
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Short Description"
              className="w-full p-2 border rounded mb-3"
            />
            <select
              name="category"
              value={newTask.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-3"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mr-2 px-4 py-2 bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-600 text-white rounded"
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



