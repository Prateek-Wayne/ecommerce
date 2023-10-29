import express from 'express';
import database from '../config/db.js';
import userRoute from '../routes/userRoutes.js';
import dotenv from 'dotenv';
import { productRoute } from '../routes/productRoutes.js';
dotenv.config();
await database();
const app=express();
app.use(express.json());
app.use('/',userRoute);
app.use('/',productRoute);
export default app;