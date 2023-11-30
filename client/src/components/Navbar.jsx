import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Navbar = () => {
  const [cookie, setCookie] = useCookies(["access-token"]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    const message = "Logout Successfully";
    setCookie("access-token", "");
    window.localStorage.removeItem("userID");
    enqueueSnackbar(message, { variant: "success" });
    navigate("/login");
  };
  const handleMobileView = () => {
    open == false ? setOpen(true) : setOpen(false);
  };
  return (
    <nav className="bg-blue-500 p-4 md:flex md:justify-between md:items-center">
      <div className="container mx-auto md:flex md:justify-between md:items-center">
        <button className="md:hidden text-white p-3 focus:outline-none ">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleMobileView}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <Link to="/" className="text-white text-3xl font-bold">
          Recipe App
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className="text-white p-3 hover:bg-yellow-400 hover:text-black hover:rounded-md transition duration-300 text-lg font-semibold"
          >
            Home
          </Link>
          <Link
            to="/create-recipe"
            className="text-white p-3 hover:bg-yellow-400 hover:text-black hover:rounded-md transition duration-300 text-lg font-semibold"
          >
            Create Recipe
          </Link>
          <Link
            to="/saved-recipes"
            className="text-white p-3 hover:bg-yellow-400 hover:text-black hover:rounded-md transition duration-300 text-lg font-semibold"
          >
            Saved Recipes
          </Link>
          {!cookie["access-token"] ? (
            <Link
              to="/login"
              className="text-white p-3 hover:bg-yellow-400 hover:text-black hover:rounded-md transition duration-300 text-lg font-semibold"
            >
              Login/Register
            </Link>
          ) : (
            <Link
              onClick={handleLogout}
              className="text-white p-3 hover:bg-yellow-400 hover:text-black hover:rounded-md transition duration-300 text-lg font-semibold"
            >
              Logout
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
      </div>

      {/* Mobile Menu Links */}
      {open == true && (
        <div className="md:hidden w-full flex flex-col items-center space-y-4 mt-4">
          <Link
            to="/"
            className="text-white text-lg font-semibold p-3 hover:bg-yellow-400 hover:border-b hover:border-black  transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/create-recipe"
            className="text-white text-lg font-semibold p-3 hover:bg-yellow-400 hover:border-b hover:border-black transition duration-300"
          >
            Create Recipe
          </Link>
          <Link
            to="/saved-recipes"
            className="text-white text-lg font-semibold p-3 hover:bg-yellow-400 hover:border-b hover:border-black transition duration-300"
          >
            Saved Recipes
          </Link>
          {!cookie["access-token"] ? (
            <Link
              to="/login"
              className="text-white text-lg font-semibold p-3 hover:bg-yellow-400 hover:border-b hover:border-black transition duration-300"
            >
              Login/Register
            </Link>
          ) : (
            <Link
              onClick={handleLogout}
              className="text-white text-lg font-semibold p-3 hover:bg-yellow-400 hover:border-b hover:border-black transition duration-300"
            >
              Logout
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
