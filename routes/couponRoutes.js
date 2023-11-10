import express from "express";
import { createCouponCtrl, getAllCoupons } from "../controller/couponCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const couponRoutes=express.Router();

couponRoutes.post('/api/v1/coupon/',isLoggedIn, createCouponCtrl);
couponRoutes.get('/api/v1/coupon/',isLoggedIn, getAllCoupons);

export default couponRoutes;