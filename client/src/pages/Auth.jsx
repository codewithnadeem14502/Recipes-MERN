import React from "react";
import { Link } from "react-router-dom";
import Register from "../components/Register";

const Auth = () => {
  return (
    <div>
      <Link path="/" element={<Register />} />
    </div>
  );
};

export default Auth;
