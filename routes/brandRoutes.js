import express from "express";
import {
  createBrandCtrl,
  deleteBrandCtrl,
  getBrandCtrl,
  getBrandsCtrl,
  updateBrandCtrl,
} from "../controller/BrandCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
const brandRoutes = express.Router();

brandRoutes.post("/api/v1/brand/", isLoggedIn, createBrandCtrl);
brandRoutes.get("/api/v1/brand/:id", isLoggedIn, getBrandCtrl);
brandRoutes.get("/api/v1/brand/", isLoggedIn, getBrandsCtrl);
brandRoutes.put("/api/v1/brand/:id", isLoggedIn, updateBrandCtrl);
brandRoutes.delete("/api/v1/brand/:id", isLoggedIn, deleteBrandCtrl);
export default brandRoutes;
