import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { Link } from "react-router-dom";

const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [savedRecipes]);

  const truncateText = (text, wordsCount) => {
    const words = text.split(" ");
    if (words.length > wordsCount) {
      return words.slice(0, wordsCount).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="">
      <div className="container m-0 p-5 md:m-5 md:p-0">
        <h1 className="text-4xl font-bold mb-8 text-center">Saved Recipes</h1>

        {userID == null || savedRecipes.length === 0 ? (
          <div className=" m-5 p-5 bg-red-500 flex items-center justify-center text-center ">
            <h1 className="text-lg font-bold text-white">
              No saved recipes found.
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {savedRecipes.map((recipe) => (
              <Link key={recipe._id} to={`/recipes/details/${recipe._id}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                  <img
                    src={recipe.imageURL}
                    alt={recipe.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">
                      {recipe.name}
                    </h2>
                    <p className="text-gray-700 mb-4">
                      <strong>Description: </strong>
                      {truncateText(recipe.instructions, 5)}
                      <span className="text-blue-500 cursor-pointer ml-1">
                        Read More
                      </span>
                    </p>
                    <p className="text-gray-700">
                      <strong>Cooking Time: </strong>
                      {recipe.cookingTime} minutes
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipe;
