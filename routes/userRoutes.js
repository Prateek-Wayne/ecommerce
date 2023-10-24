import express from 'express';
import { registerUserCtrl } from '../controller/UserCtrl.js';


const userRoute=express.Router();
userRoute.post('/api/v1/users/register',registerUserCtrl);

export default userRoute;