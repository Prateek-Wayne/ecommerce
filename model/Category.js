import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        type: String,
        required: true,
        default: 'https://picsum.photos/200/300'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
},
{
        timestamps: true
}
)