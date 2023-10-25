import express from 'express';
import { registerUserCtrl,loginUserCtrl } from '../controller/UserCtrl.js';


const userRoute=express.Router();
userRoute.post('/api/v1/users/register',registerUserCtrl);
userRoute.post('/api/v1/users/login',loginUserCtrl);

export default userRoute;