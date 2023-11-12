import express from "express";
import {
  createCouponCtrl,
  deleteCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
} from "../controller/couponCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const couponRoutes = express.Router();

couponRoutes.post("/api/v1/coupon/", isLoggedIn, createCouponCtrl);
couponRoutes.get("/api/v1/coupon/", isLoggedIn, getCoupons);
couponRoutes.get("/api/v1/coupon/:id", isLoggedIn, getCoupon);
couponRoutes.put("/api/v1/coupon/:id", isLoggedIn, updateCoupon);
couponRoutes.delete("/api/v1/coupon/:id", isLoggedIn, deleteCoupon);

export default couponRoutes;
