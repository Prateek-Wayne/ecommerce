import express from "express";
import { createProductCtrl, getProductCtrl, getProductsCtrl } from "../controller/ProductCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
export const productRoute=express.Router();
productRoute.post('/api/v1/product/new',isLoggedIn,createProductCtrl);
productRoute.get('/api/v1/product/',isLoggedIn,getProductsCtrl); // multiple products with filter and pagination ...
productRoute.get('/api/v1/product/:id',isLoggedIn,getProductCtrl); // single product ...