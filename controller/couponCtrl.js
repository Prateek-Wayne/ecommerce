import Coupon from "../model/Coupon.js";

export const createCouponCtrl = async (req, res) => {
  try {
    const { code, startDate, endDate, discount } = req.body;
    if (isNaN(discount)) {
      throw new Error("discount must be a number");
    }
    const couponExists = await Coupon.findOne({ code });
    if (couponExists) {
      throw new Error("Coupon already Exist");
    }
    const newCoupon = await Coupon.create({
      code: code?.toUpperCase(),
      startDate,
      endDate,
      discount,
      user: req.userAuthId,
    });
    return res.status(200).json({
      success: true,
      msg: "Coupon created Successfully",
      newCoupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getCoupons = async (req, res) => {
  try {
    const allCoupon = await Coupon.find();
    return res.status(200).json({
      success: true,
      msg: "orders fetched succesfully",
      allCoupon,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error.message,
    });
  }
};
export const getCoupon = async (req, res) => {
  try {
    const existingCoupon=await Coupon.findById(req.params.id);
    return res.status(201).json({
        success:true,
        msg: "Coupon fetched successfully",
        existingCoupon
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateCoupon=async(req,res)=>{
    try {
        const {code,startDate,endDate,discount}=req.body;
        const updatedCoupon=await Coupon.findByIdAndUpdate(req.params.id,{
            code:code?.toUpperCase(),
            startDate,
            endDate,
            discount
        },{
            new:true
        })
        return res.status(201).json({
            success:true,
            msg:"Coupon updated succesfully",
            updatedCoupon
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

export const deleteCoupon=async(req,res)=>{
    try {
        const deletedCoupon=await Coupon.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success:true,
            msg:"Delted Successfully",
            deletedCoupon
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
