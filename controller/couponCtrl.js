import Coupon from "../model/Coupon.js";

export const createCouponCtrl=async(req,res)=>{
    try {
        const {code,startDate,endDate,discount}=req.body;
        if(isNaN(discount))
        {
            throw new Error("discount must be a number");
        }
        const couponExists=await Coupon.findOne({code});
        if(couponExists)
        {
            throw new Error("Coupon already Exist");
        }
        const newCoupon=await Coupon.create({
            code,
            startDate,
            endDate,
            discount,
            user:req.userAuthId,
        })
        return res.status(200).json({
            success:true,
            msg:"Coupon created Successfully",
            newCoupon
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        });
    }
}

export const getAllCoupons=async(req,res)=>{
    try {
        const allCoupon=await Coupon.find();
        return res.status(200).json({
            success:true,
            msg:"orders fetched succesfully",
            allCoupon
        })
    } catch (error) {
        return res.status(200).json({
            success:false,
            error:error.message
        })
    }
}