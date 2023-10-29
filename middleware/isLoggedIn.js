import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn=(req,res,next)=>
{
    // getting token..
    const token=getTokenFromHeader(req);
    //verifying token..
    const verify=verifyToken(token);
    if(!verify)
    {
        throw new Error("Invalid/Expired Token ,Please Login again");
    }
    else{
        req.userAuthId=verify?.id;
        next();
    }

}