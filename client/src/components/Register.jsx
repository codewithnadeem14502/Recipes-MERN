import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
const Register = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        email,
        username,
        password,
      });
      const message = response.data.message;
      // alert(message);

      if (message == "User Registered Sucessfully") {
        enqueueSnackbar(message, { variant: "success" });
        navigate("/login");
      } else {
        enqueueSnackbar(message, { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-slate-100 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full p-2 border rounded-md"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Register
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
