import React, { useState } from "react";
import axios from "axios";
import { BiTime, BiImageAdd } from "react-icons/bi";
import { useSnackbar } from "notistack";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        {/* Recipe Name */}
        <div className="mb-4 flex items-center">
          <BiImageAdd className="text-gray-700 mr-2" />
          <label htmlFor="name" className="text-gray-700 block">
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
        <div className="mb-4 flex-col items-center">
          <BiImageAdd className="text-gray-700 mr-2" />
          <label htmlFor="ingredients" className="text-gray-700 block">
            Ingredients
          </label>
          {recipeData.ingredients.map((ingredient, idx) => (
            <input
              key={idx}
              type="text"
              value={ingredient}
              name="ingredients"
              className="bg-gray-300 border border-black flex m-2 p-2"
              onChange={(e) => handleIngredients(e, idx)}
            />
          ))}
          <button
            type="button"
            className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={AddIngredients}
          >
            Add Ingredients
          </button>
        </div>

        {/* Instructions */}
        <div className="mb-4 flex items-center">
          <BiImageAdd className="text-gray-700 mr-2" />
          <label htmlFor="instructions" className="text-gray-700 block">
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
        <div className="mb-4 flex items-center">
          <BiImageAdd className="text-gray-700 mr-2" />
          <label htmlFor="imageURL" className="text-gray-700 block">
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
        <div className="mb-4 flex items-center">
          <BiTime className="text-gray-700 mr-2" />
          <label htmlFor="cookingTime" className="text-gray-700 block">
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
