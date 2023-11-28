import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useSnackbar } from "notistack";
const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies("access-token");
  const { enqueueSnackbar } = useSnackbar();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const respond = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
      setCookies("access-token", respond.data.token);
      window.localStorage.setItem("userID", respond.data.userID);
      const message = respond.data.message;
      // alert(message);
      if (message == "Login Sucessfully") {
        enqueueSnackbar(message, { variant: "success" });
        navigate("/");
      } else {
        enqueueSnackbar(message, { variant: "error" });
        navigate("/register");
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
      // console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-slate-100  rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 border rounded-md"
              required
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded-md"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
