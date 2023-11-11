import User from "../model/User.js";

export const isAdmin=async (req,res,next)=>{
    const user=await User.findById(req.userAuthId);
    // check if is Admin
    if(user.isAdmin)
    {
        next();
    }
    else{
        next(new Error("admin Access required❌🎟️"))
    }
}
