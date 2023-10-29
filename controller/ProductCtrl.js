import Product from '../model/Product.js';

export const createProductCtrl = async (req, res) => {
    try {
        const { name, description, brand, category, sizes, colors, images, reviews, price, totalQty, } = req.body;

        console.log("reached here...");
        const productExist = await Product.find({ name });
        console.log(productExist);
        if (productExist.length > 0) {
            return res.status(401).json({
                success: false,
                msg: "Product already exists",
            });
        }
        const newProduct = await Product.create({
            name,
            description,
            brand,
            sizes,
            colors,
            user: req.userAuthId,
            reviews,
            price,
            totalQty,
        })
        return res.status(201).json({
            success: true,
            msg: "Product Created",
            newProduct
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

export const getProductsCtrl = async (req, res) => {
    try {
        let productsQuery = Product.find();
        // filter by name...
        if (req.query.name) {
            productsQuery = productsQuery.find({ name: { $regex: req.query.name, $options: "i" } })
        }
        // filter by color...
        if (req.query.color) {
            productsQuery = productsQuery.find({ color: { $regex: req.query.color, $options: "i" } })
        }
        //filter by category...
        if (req.query.category) {
            productsQuery = productsQuery.find({ category: { $regex: req.query.category, $options: "i" } })
        }
        //filter by brand...
        if (req.query.brand) {
            productsQuery = productsQuery.find({ brand: { $regex: req.query.brand, $options: "i" } })
        }
        //filter by size...
        if (req.query.sizes) {
            productsQuery = productsQuery.find({ sizes: { $regex: req.query.sizes, $options: "i" } })
        }
        // price-range...
        if(req.query.price)
        {   let range=req.query.price;
            range=range.split('-');
            const minPrice = parseInt(range[0]);
            const maxPrice = parseInt(range[1]);
            productsQuery = productsQuery.find({ price: { $gte: minPrice, $lte: maxPrice } });   
        }
        // pagination....
        // page...
        const page=parseInt(req.query.page)?parseInt(req.query.page):1;
        // limit...
        const limit=parseInt(req.query.limit)?parseInt(req.query.limit):1;
        // start...
        const startIndex=(page-1)*limit;
        // end...
        const endIndex=(page)*limit;
        //  total...
        const total=await Product.countDocuments();
        // applying...
        productsQuery=productsQuery.skip(startIndex).limit(limit);
        // pagination object...
        const pagination={}
        if(endIndex<total)
        {
            pagination.next={
                page:page+1,
                limit,
            };
        }
        if(startIndex>0)
        {
            pagination.prev={
                page:page-1,
            limit,
            };
        }
        // await the query to get data as json...
        const products=await productsQuery;
        return res.status(200).json({
            success:true,
            total,
            results:products.length,
            pagination,
            msg:"Products fetched succcesfully🚀🫡",
            products
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: error.message,
        })

    }
}
