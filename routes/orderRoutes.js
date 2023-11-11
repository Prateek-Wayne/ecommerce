import { createOrderCtrl, getOrderCtrl, getOrdersCtrl, updateOrderCtrl } from "../controller/orderCtrl.js";
import express from "express";
import {isLoggedIn} from '../middleware/isLoggedIn.js';

const orderRoutes= express.Router();
orderRoutes.post('/api/v1/orders/',isLoggedIn, createOrderCtrl);
orderRoutes.get('/api/v1/orders/',isLoggedIn, getOrdersCtrl);
orderRoutes.get('/api/v1/orders/:id',isLoggedIn, getOrderCtrl);
orderRoutes.put('/api/v1/orders/update/:id',isLoggedIn, updateOrderCtrl);
export default orderRoutes;