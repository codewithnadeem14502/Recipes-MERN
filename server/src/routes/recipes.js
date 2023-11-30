import express from "express";

import { RecipesModal } from "../models/Recipes.js";
import { UserModal } from "../models/users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const respond = await RecipesModal.find({});

    res.json(respond);
  } catch (error) {
    res.json(error);
  }
});
router.get("/details/:id", async (req, res) => {
  try {
    const data = await RecipesModal.findById(req.params.id);
    const id = data.userOwner;
    const userid = await UserModal.findById(id);
    const username = userid.username;
    res.json({ data, username });
    // res.send({ data, username });
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
  const recipe = await RecipesModal.findById(req.body.recipeID);
  const user = await UserModal.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await RecipesModal.findById(req.params.userID);
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
// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModal.findById(req.params.userId);
    const savedRecipes = await RecipesModal.find({
      _id: { $in: user.savedRecipes },
    });

    console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as recipesRouter };
