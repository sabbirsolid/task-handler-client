import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa"; // Importing Google icon

const Login = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle().then(async (res) => {
        if (res.user) {
          const userData = {
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.displayName,
          };

          // Send user data to the backend
          try {
            const response = await axios.post(
              "http://localhost:5000/addUser",
              userData
            );
            toast.success("Login successful!", response.message);
          } catch (err) {
            console.error("Error sending user data to backend:", err.message);
          }
        }
      });
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all w-full sm:w-auto"
      >
        <FaGoogle size={15} /> {/* Google icon */}
        <span>Sign in</span>
      </button>
    </div>
  );
};

export default Login;
