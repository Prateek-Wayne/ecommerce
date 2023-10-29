import express from "express";
import { createProductCtrl } from "../controller/ProductCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
export const productRoute=express.Router();
productRoute.post('/api/v1/product/new',isLoggedIn,createProductCtrl);