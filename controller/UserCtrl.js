import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js';
import { verifyToken } from '../utils/verifyToken.js';

export const registerUserCtrl = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                msg: "user already exists"
            })
        }
        // generating salt...
        const salt = await bcrypt.genSalt(10);
        // hashing password...
        const hashedPassword = await bcrypt.hash(password, salt);
        // creating new user...
        const newUser = await User.create({
            fullName: fullname,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            success: true,
            newUser
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: `🚀 ~ file: UserCtrl.js:27 ${error} `
        })
    }
};

export const loginUserCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(401).json({
                success: false,
                msg: "wrong email || password"
            });
        }
        const isLegit = await bcrypt.compare(password, userExist.password);
        if (!isLegit) {
            return res.status(401).json({
                success: false,
                msg: "wrong email || password"
            })
        }
        return res.status(200).json({
            success: true,
            userExist,
            token: generateToken(userExist?._id),
        })

    } catch (error) {
        return res.status(401).json(
            {
                success: false,
                msg: error.message
            }
        )
    }
};

export const getUserProfileCtrl = async (req, res) => {
    try {
        
        console.log("🚀 ~ file: UserCtrl.js:74 ~ getUserProfileCtrl ~ req:", req)
        return res.status(201).json({
            success: true,
            msg: "Hello world",
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            mag: error.message
        })
    }
};