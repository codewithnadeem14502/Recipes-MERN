import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

// middle ware
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose
  .connect(
    "mongodb+srv://codewithnadeem:nadeem@recipes.2b2fvqr.mongodb.net/recipes?retryWrites=true&w=majority"
  )
  .then((res) => console.log("Database is Connected"))
  .catch((error) => console.log(error));
app.listen(5000, () => {
  console.log("Server is Working");
});
