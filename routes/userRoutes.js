import express from "express";
import {
  registerUserCtrl,
  loginUserCtrl,
  getUserProfileCtrl,
  updateShippingAddressCtrl,
} from "../controller/UserCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const userRoute = express.Router();
userRoute.post("/api/v1/users/register", registerUserCtrl);
userRoute.post("/api/v1/users/login", loginUserCtrl);
userRoute.get("/api/v1/users/profile", isLoggedIn, getUserProfileCtrl);
userRoute.put("/api/v1/update/shipping", isLoggedIn, updateShippingAddressCtrl);
export default userRoute;
