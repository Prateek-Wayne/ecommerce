import mongoose from "mongoose";

const Schema=mongoose.Schema;
const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        // ref: Orders
    }],
    whishList: [{
        type: mongoose.Schema.Types.ObjectId,
        // ref: Whishlist
    }],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    hasShippingAddress: {
        type: Boolean,
        default: true,
    },
    shippingAddress: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        city: {
            type: String
        },
        postalCode: {
            type: Number
        },
        province: {
            type: String
        },
        country: {
            type: String
        }
    }
},
    {
        timestamps: true,
    }
);
const User=mongoose.model('User',UserSchema);
export default User;