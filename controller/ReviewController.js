import Product from "../model/Product.js";
import Review from "../model/Review.js";


export const reviewController=async(req,res)=>{
    try {
        console.log("🚀 ~ file: ReviewController.js:8 ~ reviewController ~ params:",req.params)
        const productId=req.params.id;
        
        const {message,rating}=req.body;
        const productFound=await Product.findById(productId);

        if(!productFound)
        {
            throw new Error("Product Not found 😔❌");
        }

        
        const review=await Review.create({
            message,
            rating,
            product:productFound?._id,
            user:req.userAuthId,
        })
        // pushing in review...
        productFound.reviews.push(review?._id);
        // saving  product..
        await productFound.save();
        return res.status(201).json({
            success:true,
            review,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }

}