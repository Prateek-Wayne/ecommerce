import Product from '../model/Product.js';

export const createProductCtrl=async(req,res)=>{
    try {
        const {name,description,brand,category,sizes,colors,images,reviews,price,totalQty,} =req.body;

        console.log("reached here...");
        const productExist=await Product.find({name});
        console.log(productExist);
        if(productExist.length>0)
        {
            return res.status(401).json({
                success:false,
                msg:"Product already exists",
            });
        }
        const newProduct=await Product.create({
            name,
            description,
            brand,
            sizes,
            colors,
            user:req.userAuthId,
            reviews,
            price,
            totalQty,
        })
        return res.status(201).json({
            success:true,
            msg:"Product Created",
            newProduct
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message,
        })
    }   
}