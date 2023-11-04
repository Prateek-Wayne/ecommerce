import Product from "../model/Product.js";
import Review from "../model/Review.js";


export const reviewController=async(req,res)=>{
    try {
        const productId=req.params.id;
        const {message,rating}=req.body;
        const productFound=await Product.findById(productId).populate("reviews");

        if(!productFound)
        {
            throw new Error("Product Not found 😔❌");
        }
        const hasReviewed=productFound?.reviews?.find((review) => {
            if(review?.user.toString()===req?.userAuthId?.toString())
                return true;
            return false;
        	});

       if(hasReviewed)
       {
        throw new Error("Already Reviewd By same User ❌🫡");
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