import mongoose from "mongoose";
const Schema=mongoose.Schema;

const  ProductSchema=new Schema(
    {
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        ref:"Category",
        required:true,
    },
    sizes:{
        type:[String],
        enum:["S","M","L","XL","XXl"],
        required:true,
    },
    colors:{
        type:[String],
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    images:[
        {
            type:String,
            default:"https://via.placeholder.com/150",
        }
    ],
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    price:{
        type:Number,
        required:true,
    },
    totalQty:{
        type:Number,
        required:true,
    },
    totalSold:{
        type:Number,
        required:true,
        default:0,
    }

},
{
    timestamps:true,
    toJSON:{virtuals:true},
}
);

// Virtuals New Concept...
// Total Ratings...
ProductSchema.virtual('totalRatings').get(function(){

    return this?.reviews?.length;
    // console.log("This",this);
})

ProductSchema.virtual('averageRating').get(function(){
    let ratingsTotal = 0;
  this.reviews.forEach(review => {
    ratingsTotal += review.rating;
  });
  const average = (ratingsTotal / this.reviews.length) || 0;
  console.log("🚀 ~ file: Product.js:84 ~ ProductSchema.virtual ~ average:", Number(average.toFixed(2)))
  return Number(average.toFixed(2));
})

const Product=mongoose.model("Product",ProductSchema);
export default Product;