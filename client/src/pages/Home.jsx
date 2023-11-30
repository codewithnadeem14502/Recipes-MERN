import React, { useEffect, useState } from "react";
import axios from "axios";

import { IoTimeSharp } from "react-icons/io5";

import { Link } from "react-router-dom";
const Home = () => {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");

        setRecipe(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
  }, []);

  const truncateText = (text, wordsCount) => {
    const words = text.split(" ");
    if (words.length > wordsCount) {
      return words.slice(0, wordsCount).join(" ") + "...";
    }
    return text;
  };
  return (
    <div className="bg-slate-50 container mx-auto p-8">
      <h2 className="text-4xl font-semibold mb-8 text-center">
        Delicious Recipes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8   ">
        {recipe.map((recipeItem) => (
          <Link key={recipeItem._id} to={`/recipes/details/${recipeItem._id}`}>
            <div
              key={recipeItem._id}
              className="bg-slate-100 overflow-hidden  rounded-xl hover:bg-yellow-300 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                className="w-full h-48 object-cover object-center"
                src={recipeItem.imageURL}
                alt={recipeItem.name}
              />

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{recipeItem.name}</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Description: </strong>
                  {truncateText(recipeItem.instructions, 5)}
                  <span className="text-blue-500 cursor-pointer ml-1">
                    Read More
                  </span>
                </p>

                <div className="flex justify-between text-center align-middle">
                  <p className="flex  text-gray-800 mt-2 text-lg font-semibold text-center ">
                    <strong>
                      <IoTimeSharp className="text-red-500 w-5 h-5 mr-2 mt-1" />
                    </strong>
                    {recipeItem.cookingTime} minutes
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
