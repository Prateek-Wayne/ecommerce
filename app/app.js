import express from 'express';
import database from '../config/db.js';
import userRoute from '../routes/userRoutes.js';
import dotenv from 'dotenv';
import { productRoute } from '../routes/productRoutes.js';
import categoryRoutes from '../routes/categoryRoutes.js';
import brandRoutes from '../routes/brandRoutes.js';
import reviewRoutes from '../routes/reviewRoutes.js';
dotenv.config();
await database();
const app=express();
app.use(express.json());
app.use('/',userRoute);
app.use('/',productRoute);
app.use('/',categoryRoutes);
app.use('/',brandRoutes);
app.use('/',reviewRoutes);
export default app;