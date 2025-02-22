import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./Provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainRoute from "./routes/MainRoute";
import ActivityLog from "./components/ActivityLog";
import Home from "./components/Home";
import Profile from "./components/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute></MainRoute>,
    children:[
      {
        path: '/activityLog',
        element: <ActivityLog></ActivityLog>
      },
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/profile',
        element: <Profile></Profile>
      },
    ]
  },
  
]);
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
