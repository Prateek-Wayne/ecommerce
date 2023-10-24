import User from '../model/User.js';

export const registerUserCtrl=async(req,res)=>{
   try {
    const {fullname,email,password}=req.body;
    const userExist=await User.findOne({email});
    if(userExist)
    {
        return res.status(400).json({
            msg:"user already exists"
        })
    }
    // creating new user...
    const newUser=await User.create({
        fullName:fullname,
        email,
        password
    })
    return res.status(201).json({
        newUser
    });
    
   } catch (error) {
    return res.status(401).json({
        msg:`🚀 ~ file: UserCtrl.js:27 ${error} `
    })
   }
};