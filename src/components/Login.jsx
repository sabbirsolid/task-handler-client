import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

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
            toast.success("Login successful!");
          } catch (err) {
            // console.error("Error sending user data to backend:", err);
          }
        }
      });
    } catch (error) {
      // console.error("Google login error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
