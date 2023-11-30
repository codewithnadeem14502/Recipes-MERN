import React, { useState } from "react";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
import { GiCookingPot } from "react-icons/gi";
import { useSnackbar } from "notistack";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { FaImage } from "react-icons/fa6";
const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    userOwner: userID,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle ingredient changes
  const handleIngredients = (e, idx) => {
    const { value } = e.target;
    setRecipeData((prevData) => {
      const ingredients = [...prevData.ingredients];
      ingredients[idx] = value;
      return { ...prevData, ingredients };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/recipes", recipeData);

      const message = "Recipe created successfully";
      enqueueSnackbar(message, { variant: "success" });
      navigate("/");
    } catch (error) {
      console.error("Error creating recipe:", error);
      const errorMessage = "Failed to create recipe";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  // Add an empty ingredient field
  const AddIngredients = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, ""],
    }));
  };
  // console.log(recipeData);
  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 ">Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        {/* Recipe Name */}
        <div className="mb-4  flex items-center whitespace-nowrap">
          <GiCookingPot className="text-gray-700 w-10 h-10 " />
          <label htmlFor="name" className="text-gray-700 block pr-2">
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border rounded-md"
            required
            value={recipeData.name}
            onChange={handleChange}
          />
        </div>

        {/* Ingredients */}
        <div className="mb-4 flex-col py-3">
          <div className="flex items-center my-2">
            <IoIosAddCircle className="text-gray-700 w-5 h-5 mr-2" />
            <label htmlFor="ingredients" className="text-gray-700 block pr-2">
              Ingredients
            </label>
          </div>
          {recipeData.ingredients.map((ingredient, idx) => (
            <input
              key={idx}
              type="text"
              value={ingredient}
              name="ingredients"
              className="bg-gray-300 border border-black m-2 p-2 text-center"
              onChange={(e) => handleIngredients(e, idx)}
            />
          ))}
          <button
            type="button"
            className="bg-slate-500 text-white px-4 mt-3 py-2 rounded-md hover:bg-green-600"
            onClick={AddIngredients}
          >
            Add Ingredients
          </button>
        </div>

        {/* Instructions */}
        <div className="mb-4 flex items-center whitespace-nowrap">
          <FaEdit className="text-gray-700 w-5 h-5 mr-2" />
          <label htmlFor="instructions" className="text-gray-700 block pr-2">
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            className="w-full p-2 border rounded-md"
            rows="4"
            required
            value={recipeData.instructions}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Image URL */}
        <div className="mb-4 flex items-center whitespace-nowrap">
          <FaImage className="text-gray-700 w-5 h-5 mr-2" />
          <label htmlFor="imageURL" className="text-gray-700 block pr-2">
            Image URL
          </label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            className="w-full p-2 border rounded-md"
            value={recipeData.imageURL}
            onChange={handleChange}
          />
        </div>

        {/* Cooking Time */}
        <div className="mb-4 flex items-center whitespace-nowrap">
          <IoTimeSharp className="text-gray-700 w-5 h-5 mr-2" />
          <label htmlFor="cookingTime" className="text-gray-700 block pr-2">
            Cooking Time
          </label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            className="w-full p-2 border rounded-md"
            value={recipeData.cookingTime}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
