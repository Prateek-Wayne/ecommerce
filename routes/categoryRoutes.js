import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { createCategoryCtrl, deleteCategoryCtrl, getCategoriesCtrl, getCategoryCtrl, updateCategoryCtrl } from "../controller/CategoryCtrl.js";

const categoryRoutes=express.Router();
categoryRoutes.post('/api/v1/categories/',isLoggedIn,createCategoryCtrl);
categoryRoutes.get('/api/v1/categories/',isLoggedIn,getCategoriesCtrl);
categoryRoutes.get('/api/v1/categories/:id',isLoggedIn,getCategoryCtrl);
categoryRoutes.put('/api/v1/categories/:id',isLoggedIn,updateCategoryCtrl);
categoryRoutes.delete('/api/v1/categories/:id',isLoggedIn,deleteCategoryCtrl);

export default categoryRoutes;