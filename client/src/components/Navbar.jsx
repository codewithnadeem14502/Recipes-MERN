import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Navbar = () => {
  const [cookie, setCookie] = useCookies(["access-token"]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handlelogout = () => {
    const message = "Logout Successfully";
    setCookie("access-token", "");
    window.localStorage.removeItem("userID");
    enqueueSnackbar(message, { variant: "success" });
    navigate("/login");
  };
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold">
          Recipe App
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-white  p-3 hover:bg-pink-400 hover:rounded-md transition duration-300 text-lg font-semibold"
          >
            Home
          </Link>

          <Link
            to="/create-recipe"
            className="text-white  p-3 hover:bg-pink-400 hover:rounded-md transition duration-300 text-lg font-semibold"
          >
            Create Recipe
          </Link>

          <Link
            to="/saved-recipes"
            className="text-white  p-3 hover:bg-pink-400 hover:rounded-md transition duration-300 text-lg font-semibold"
          >
            Saved Recipes
          </Link>
          {!cookie["access-token"] ? (
            <Link
              to="/login"
              className="text-white  p-3 hover:bg-pink-400 hover:rounded-md transition duration-300 text-lg font-semibold"
            >
              Login/Register
            </Link>
          ) : (
            <Link
              onClick={handlelogout}
              className="text-white  p-3 hover:bg-pink-400 hover:rounded-md transition duration-300 text-lg font-semibold"
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
