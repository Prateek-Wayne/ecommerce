import express from "express";
import { reviewController } from "../controller/ReviewController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const reviewRoutes = express.Router();
reviewRoutes.post("/api/v1/review/:id", isLoggedIn, reviewController);
export default reviewRoutes;
