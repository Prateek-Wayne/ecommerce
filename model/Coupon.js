import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON:{virtuals:true},
  }
);

// Coupon is expired...
CouponSchema.virtual("isExpired").get(function () {
  return this.endDate < Date.now();
});

// days left ...
CouponSchema.virtual("daysLeft").get(function(){
    const daysLeft=Math.ceil((this.endDate-Date.now())/(1000*60*60*24));
    return daysLeft;
});
// validation

CouponSchema.pre('validate', function (next) {
    if (this.endDate < this.startDate) {
      next(new Error("endDate is less than startDate"));
    } else {
      next();
    }
  });
  
  CouponSchema.pre('validate', function (next) {
    if (this.discount <= 0 || this.discount > 100) {
      next(new Error("discount is not valid"));
    } else {
      next();
    }
  });
  
  CouponSchema.pre('validate', function (next) {
    if (this.startDate < Date.now()) {
      next(new Error("startDate cannot be less than today"));
    } else {
      next();
    }
  });
  
  CouponSchema.pre('validate', function (next) {
    if (this.endDate < Date.now()) {
      next(new Error("endDate cannot be less than today"));
    } else {
      next();
    }
  });


const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;
