Here's a **README.md** file for your Task Management Application:

---

# 📝 Task Management Application

## 📌 Overview
The **Task Management Application** is a feature-rich web app that allows users to efficiently organize their tasks using a **drag-and-drop** interface. Tasks are categorized into three sections: **To-Do, In Progress, and Done**, ensuring a structured workflow. The app instantly syncs changes to a **MongoDB database**, providing **real-time persistence**.

This project demonstrates expertise in **frontend interactivity, backend data management, and real-time synchronization** while maintaining a **clean and responsive UI**.

## 🚀 Features
### 🔐 Authentication
- Users must **sign in** to access the application.
- **Google Authentication** via Firebase.
- User details (ID, email, display name) are stored in the database upon first login.

### ✅ Task Management System
- Add, edit, delete, and reorder tasks.
- Drag-and-drop tasks between the following categories:
  - **To-Do**
  - **In Progress**
  - **Done**
- Reorder tasks within the same category.
- Changes are saved instantly to the **MongoDB database**.
- Each task contains:
  - **Title** (required, max 50 characters)
  - **Description** (optional, max 200 characters)
  - **Timestamp** (auto-generated)
  - **Category** (To-Do, In Progress, Done)

### 📂 Database & Real-Time Updates
- **MongoDB** (via **Express.js**) for task storage.
- Tasks persist across sessions and page refreshes.
- Real-time updates using:
  - **MongoDB Change Streams**
  - **WebSockets**
  - **Optimistic UI Updates**
  - **Polling** (as a fallback)

### 🎨 Frontend & UI
- **Built with React + Vite.js** for fast performance.
- Drag-and-drop functionality using `@hello-pangea/dnd`.
- Minimalist and **fully responsive** design.
- Limited color palette for a **clean look**.

### 📱 Responsiveness
- Optimized for both **desktop and mobile**.
- **Smooth drag-and-drop experience** on touch devices.

### 🖥️ Backend (Express.js API)
- RESTful API to manage tasks with **CRUD operations**:
  - `POST /tasks` – Add a new task
  - `GET /tasks` – Retrieve all tasks for the logged-in user
  - `PUT /tasks/:id` – Update a task (title, description, category)
  - `DELETE /tasks/:id` – Remove a task permanently

### ⭐ Bonus Features
- **Dark mode toggle** for better accessibility.
- **Task due dates** with **color indicators** (e.g., overdue tasks turn red).
- **Activity log** to track changes (e.g., `"Task moved to Done"`).

## 🛠️ Tech Stack
### **Frontend**
- ⚡ **React** (`^18.3.1`) + **Vite.js**
- 📦 **@hello-pangea/dnd** (Drag-and-drop)
- 🔥 **Firebase** (`^10.8.0`) (Authentication)
- 🔄 **React Query** (`^5.66.8`) (Data fetching & caching)
- 🔔 **react-hot-toast** (`^2.4.1`) (Notifications)
- 🎨 **lucide-react** (`^0.475.0`) (Icons)
- 🌟 **react-icons** (`^5.0.1`)
- ⏳ **react-spinners** (`^0.15.0`)

### **Backend**
- 🏗 **Express.js** (Server-side API)
- 🗄 **MongoDB** (Database)
- 🔗 **Axios** (`^1.7.9`) (API communication)
- ⏳ **date-fns** (`^4.1.0`) (Date handling)

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v16+)
- **MongoDB** (local or cloud)
- **Firebase Project** (for authentication)

### 🔧 Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase Authentication**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Google Authentication**.
   - Copy Firebase config and create a `.env` file:
     ```env
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     ```

4. **Set up MongoDB**:
   - Start a local MongoDB instance or use [MongoDB Atlas](https://www.mongodb.com/atlas).
   - Create a `.env` file in the backend directory:
     ```env
     MONGO_URI=mongodb+srv://your_mongo_uri
     ```

5. **Start the backend server**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

6. **Start the frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open the app** in your browser:
   ```
   http://localhost:5173
   ```

## 🐛 Troubleshooting
- **Firebase Auth not working?** Check your Firebase API keys and ensure Google Sign-In is enabled.
- **MongoDB connection issue?** Verify your `.env` file and that MongoDB is running.
- **Drag-and-drop not working?** Ensure `@hello-pangea/dnd` is correctly installed.

## 👨‍💻 Contributors
- **[Your Name](https://github.com/yourgithub)** – Developer

## 📜 License
This project is **open-source** under the **MIT License**.

---

Let me know if you want to add any screenshots, more sections, or adjustments! 🚀
