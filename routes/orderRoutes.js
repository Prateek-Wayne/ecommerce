import { createOrderCtrl } from "../controller/OrderCtrl.js";
import express from "express";
import {isLoggedIn} from '../middleware/isLoggedIn.js';

const orderRoutes= express.Router();
orderRoutes.post('/api/v1/orders/',isLoggedIn, createOrderCtrl);
export default orderRoutes;