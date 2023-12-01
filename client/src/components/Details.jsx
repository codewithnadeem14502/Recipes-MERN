import { VscDebugBreakpointLog } from "react-icons/vsc";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa6";
import { useSnackbar } from "notistack";
import { useGetUserID } from "../hooks/useGetUserID";
const Details = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/recipes/details/${id}`
        );
        // console.log(id);
        setRecipe(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchSavedRecipes = async () => {
      if (userID == "") {
        const message = "Login First";
        enqueueSnackbar(message, { variant: "error" });
      } else {
        try {
          const response = await axios.get(
            `http://localhost:5000/recipes/savedRecipes/ids/${userID}`
          );

          setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchSavedRecipes();
    fetchDetails();
  }, [savedRecipes]);
  const saveRecipe = async (recipeID) => {
    console.log(recipeID, userID);
    if (userID == null) {
      const message = "Login First";
      enqueueSnackbar(message, { variant: "error" });
    } else {
      try {
        const response = await axios.put("http://localhost:5000/recipes", {
          recipeID,
          userID,
        });
        setSavedRecipes(response.data.savedRecipes);
        // console.log(reponse);
        const message = "Saved Recipe";
        enqueueSnackbar(message, { variant: "success" });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className=" mx-auto bg-white p-8 rounded shadow-xl hover:shadow-xl transition duration-300 ">
        <img
          src={recipe?.data?.imageURL}
          alt={recipe?.data?.name}
          className="w-[100%] h-96 rounded"
        />
        <p className="text-gray-700 m-3 font-semibold   ">
          Created By: {recipe?.username}
        </p>
        <h2 className="text-3xl mt-10 mb-4  flex">
          {recipe?.data?.name}
          <FaRegBookmark
            className="w-6 h-6 hover:text-red-500 ml-2 mb-5 "
            onClick={() => saveRecipe(recipe.data._id)}
          />
        </h2>
        <p className="text-gray-700 mb-4 ">
          <strong className="font-semibold">Description: </strong>
          {recipe?.data?.instructions}
        </p>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Ingredients:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 my-3">
            {recipe?.data?.ingredients &&
              recipe.data.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center">
                  <VscDebugBreakpointLog className="mr-2 text-yellow-500" />
                  {ingredient}
                </div>
              ))}
          </div>
        </div>
        <p className="text-gray-700 mb-4 font-semibold">
          Cooking Time: {recipe?.data?.cookingTime} Mins
        </p>
      </div>
    </div>
  );
};

export default Details;
