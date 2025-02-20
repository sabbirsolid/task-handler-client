import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const Login = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle().then(async (res) => {
        console.log(res.user);
        if (res.user) {
          const userData = {
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.displayName,
          };

          console.log(userData);

          // Send user data to the backend
          try {
            const response = await axios.post(
              "http://localhost:5000/addUser",
              userData
            );
            console.log("Server response:", response.data);
            alert("Login successful!");
          } catch (err) {
            console.error("Error sending user data to backend:", err);
          }
        }
      });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
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
