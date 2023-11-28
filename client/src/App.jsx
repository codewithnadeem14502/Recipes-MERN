import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import SavedRecipe from "./pages/SavedRecipe";
import Auth from "./pages/Auth";
const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
