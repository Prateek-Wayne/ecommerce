import express from "express";
import {
  createProductCtrl,
  deleteProductCtrl,
  getProductCtrl,
  getProductsCtrl,
  updateProductCtrl,
} from "../controller/ProductCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import upload from "../config/fileUpload.js";
export const productRoute = express.Router();
productRoute.post(
  "/api/v1/product/new",
  isLoggedIn,
  upload.array("files"),
  createProductCtrl,
);
productRoute.get("/api/v1/product/", getProductsCtrl); // multiple products with filter and pagination ...
productRoute.get("/api/v1/product/:id", isLoggedIn, getProductCtrl); // single product ...
productRoute.put("/api/v1/product/:id", isLoggedIn, updateProductCtrl); // update product ...
productRoute.delete(
  "/api/v1/product/:id/delete",
  isLoggedIn,
  deleteProductCtrl,
); // update product ...
