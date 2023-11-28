import express from "express";
import mongoose from "mongoose";
import { RecipesModal } from "../models/Recipes.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const respond = await RecipesModal.find({});

    res.json(respond);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  const recipe = new RecipesModal(req.body);

  try {
    const respond = await recipe.save();
    res.json(respond);
  } catch (error) {
    res.json(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const recipe = await RecipesModal.findById(req.body.recipeID);
    const user = await RecipesModal.findById(req.body.userID);

    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedrecipes/:id", async (req, res) => {
  try {
    const user = await RecipesModal.findById(req.body.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});
router.get("/savedrecipes", async (req, res) => {
  try {
    const user = await RecipesModal.findById(req.body.userID);
    const savedRecipes = await RecipesModal.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

export { router as recipesRouter };
