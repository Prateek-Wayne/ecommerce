import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import Coupon from "../model/Coupon.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createOrderCtrl = async (req, res) => {
  try {
    // applying loginc for coupon ...
    const { coupon } = req?.query;
    const couponFound = await Coupon.findOne({
      code: coupon?.toUpperCase(),
    });
    if (couponFound?.isExpired) {
      throw new Error("Coupon is expired");
    }
    // if(!couponFound)
    // {
    //     throw new Error("Coupon does not exists");
    // }
    const discount = couponFound?.discount / 100;
    // from body
    const { orderItems, shippingAddress, totalPrice } = req.body;
    const user = await User.findById(req.userAuthId);
    if (orderItems.length <= 0) {
      throw new Error("No Order Found...");
    }
    const id = req?.userAuthId;
    // creating Order --save in DB
    const order = await Order.create({
      user: id,
      orderItems,
      shippingAddress,
      totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
    });
    // console.log(order);
    // saving user...
    user.orders.push(order?._id);
    await user.save();
    if (!user?.shippingAddress) {
      throw new Error("Please Provide Shipping Address...");
    }
    // updating product totalQty,
    const products = await Product.find({ _id: { $in: orderItems } });
    const saveme = async (param) => {
      await param.save();
    };
    orderItems?.map((order) => {
      const product = products?.find((product) => {
        return product._id.toString() === order._id.toString();
      });
      if (product && product?.totalQty >= order?.totalQtyBuy) {
        product.totalQty -= order.totalQtyBuy;
        product.totalSold += order.totalQtyBuy;

        saveme(product);
      }
    });
    // payments and stirpe
    const convertedOrders = order?.orderItems.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item?.name,
            description: item?.name,
          },
          unit_amount: item?.price * 100,
        },
        quantity: item?.totalQtyBuy,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: convertedOrders,
      metadata: {
        orderId: JSON.stringify(order._id),
      },
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/success",
    });

    res.send({ url: session.url });

    // res.status(202).json({
    //     success:true,
    //     msg:"Order Created Successfully",
    //     order
    // });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getOrdersCtrl = async (req, res) => {
  try {
    const allOrders = await Order.find();
    return res.status(200).json({
      success: true,
      allOrders,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      error: error.message,
    });
  }
};

export const getOrderCtrl = async (req, res) => {
  try {
    const singleOrder = await Order.findById(req.params.id);
    return res.status(200).json({
      status: true,
      singleOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateOrderCtrl = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      },
    );
    return res.status(201).json({
      success: true,
      msg: "updated Successfully",
      updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
