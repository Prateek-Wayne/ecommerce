import Order from '../model/Order.js';
import User from '../model/User.js';
import Product from '../model/Product.js';




export const createOrderCtrl=async(req,res)=>{
    try {
        // from body 
        const {orderItems,shippingAddress,totalPrice}=req.body;
        const user=await User.findById(req.userAuthID);
        if(orderItems.length<=0)
        {
            throw new Error("No Order Found...");
        }
        const id=req?.userAuthId;
        // creating Order --save in DB
        const order=await Order.create({
            user:id,
            orderItems,
            shippingAddress,
            totalPrice
        })
        // saving user...
        user.orders.push(order?._id);
        await user.save();
        // updating product totalQty,
        const products = await Product.find({ _id: { $in: orderItems } });

        orderItems?.map((order) => {
            const product = products?.find((product) => {
                return product._id.toString() === order._id.toString();
            });
            if(product)
            {
                product.totalSold+=order.qty;
            }
        });
        
        
        res.status(202).json({
            success:true,
            msg:"Order Created Successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
};