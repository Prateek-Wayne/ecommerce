import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { createCategoryCtrl } from "../controller/CategoryCtrl.js";

const categoryRoutes=express.Router();
categoryRoutes.post('/api/v1/categories/',isLoggedIn,createCategoryCtrl);
export default categoryRoutes;