import Category from "../model/Category.js";

export const createCategoryCtrl=async (req,res)=>{
    try {
        const {name}=req.body;
        const categoryExists=await Category.findOne({name});
        if(categoryExists)
        {
            throw new Error("Category already exists...");
        }
        const newCategory=await Category.create({
            name,
            user:req.userAuthId
        });
        return res.status(200).json({
            success:true,
            msg:"Category Created Successfully",
            newCategory,
        });        
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        })
        
    }
}
