import mongoose from "mongoose";

const RecipesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export const RecipesModal = mongoose.model("recipes", RecipesSchema);
