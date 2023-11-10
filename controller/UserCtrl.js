import User from "../model/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const registerUserCtrl = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        msg: "User already exists",
      });
    }
    // generating salt...
    const salt = await bcrypt.genSalt(10);
    // hashing password...
    const hashedPassword = await bcrypt.hash(password, salt);
    // creating new user...
    const newUser = await User.create({
      fullName: fullname,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: `Couldn't register user due to ${error} `,
    });
  }
};

export const loginUserCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({
        success: false,
        msg: "wrong email || password",
      });
    }
    const isLegit = await bcrypt.compare(password, userExist.password);
    if (!isLegit) {
      return res.status(401).json({
        success: false,
        msg: "wrong email || password",
      });
    }
    return res.status(200).json({
      success: true,
      userExist,
      token: generateToken(userExist?._id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const getUserProfileCtrl = async (req, res) => {
  try {
    const profile =await User.findById(req.userAuthId).populate("orders");
    return res.status(200).json({
      success: true,
      msg: "User found 🫡🚀",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mag: error.message,
    });
  }
};

export const updateShippingAddressCtrl = async (req, res) => {
  try {
    
    const { country, province, postalCode, city, lastName, firstName } = req.body;
  const user = await User.findByIdAndUpdate(req.userAuthId, {
    shippingAddress: {
      country, province, postalCode, city, lastName, firstName
    }
  });
  await user.save();
  if(!user?.hasShippingAddress){
    user.hasShippingAddress=true;
  }
  await user.save();
  return res.status(201).json({
    success:true,
    msg:"added user succesfully",
    user
  })
  } catch (error) {
    return res.status(500).json({
      success:false,
      error:error.message,
    })
  }
}
