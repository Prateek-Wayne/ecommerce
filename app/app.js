import express from "express";
import database from "../config/db.js";
import userRoute from "../routes/userRoutes.js";
import dotenv from "dotenv";
import { productRoute } from "../routes/productRoutes.js";
import categoryRoutes from "../routes/categoryRoutes.js";
import brandRoutes from "../routes/brandRoutes.js";
import reviewRoutes from "../routes/reviewRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import Stripe from "stripe";
import Order from "../model/Order.js";
import couponRoutes from "../routes/couponRoutes.js";
dotenv.config();
database();
const app = express();

// logic for stripe ...
const stripe = new Stripe(process.env.STRIPE_KEY);
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_518fa780ddf52ebb3db060a6b3374f203a9bb78c02834b3b94783c1825051f71";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      // console.log("🚀 ~ file: app.js:35 ~ app.post ~ event:", event)
    } catch (err) {
      // console.log("🚀 ~ file: app.js:41 ~ app.post ~ err.message:", err.message)
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;

      // getting order from orderId...
      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          totalPrice: totalAmount / 100,
          currency,
          paymentMethod,
          paymentStatus,
        },
        {
          new: true,
        },
      );
    }
    response.send();
  },
);

app.use(express.json());
app.use("/", userRoute);
app.use("/", productRoute);
app.use("/", categoryRoutes);
app.use("/", brandRoutes);
app.use("/", reviewRoutes);
app.use("/", orderRoutes);
app.use("/", couponRoutes);
export default app;
