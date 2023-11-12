import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review Must Belong to a User"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Review Must Belong to a Product"],
    },
    message: {
      type: String,
      required: [true, "Please Add a Message"],
    },
    rating: {
      type: Number,
      required: [true, "Please add a Rating between 1 to 5"],
      min: 1,
      max: 5,
    },
  },
  { timestamps: true },
);
const Review = mongoose.model("Review", ReviewSchema);
export default Review;
