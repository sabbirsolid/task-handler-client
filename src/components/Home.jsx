import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Toaster, toast } from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import Navbar from "./Navbar";
import Login from "./Login";
import { AuthContext } from "../Provider/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Fetch tasks using TanStack Query
  const { data: tasks = { todo: [], "in-progress": [], done: [] }, refetch } =
    useQuery({
      queryKey: ["tasks"],
      queryFn: async () => {
        const res = await axios.get(
          "http://localhost:5000/getTasks",
          user?.email
        );
        const fetchedTasks = res.data;
        return {
          todo: fetchedTasks.filter((task) => task.category === "todo"),
          "in-progress": fetchedTasks.filter(
            (task) => task.category === "in-progress"
          ),
          done: fetchedTasks.filter((task) => task.category === "done"),
        };
      },
    });

  // Mutation for adding a new task
  const addTaskMutation = useMutation({
    mutationFn: async (newTask) => {
      const res = await axios.post("http://localhost:5000/addTask", newTask);
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
          queryClient.invalidateQueries(["tasks"]); // Refetch on error
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

  return (
    <div className="min-h-screen p-8">
      <Toaster position="top-right" />
      <Navbar />
      <h1 className="text-4xl text-center font-bold text-secondary">
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
            />
            <TaskColumn
              title="In Progress"
              tasks={tasks["in-progress"]}
              droppableId="in-progress"
              openModal={openModal}
            />
            <TaskColumn
              title="Done"
              tasks={tasks.done}
              droppableId="done"
              openModal={openModal}
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

// Task Column Component
const TaskColumn = ({ title, tasks, droppableId, openModal }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={openModal} className="btn btn-primary">
          <FiPlus className="inline-block mr-1" />
          Add Task
        </button>
      </div>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-column"
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task-card"
                  >
                    <h3 className="font-medium">{task.title}</h3>
                    <p>{task.description}</p>
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
