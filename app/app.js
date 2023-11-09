import express from 'express';
import database from '../config/db.js';
import userRoute from '../routes/userRoutes.js';
import dotenv from 'dotenv';
import { productRoute } from '../routes/productRoutes.js';
import categoryRoutes from '../routes/categoryRoutes.js';
import brandRoutes from '../routes/brandRoutes.js';
import reviewRoutes from '../routes/reviewRoutes.js';
import orderRoutes from '../routes/orderRoutes.js';
import Stripe from "stripe";
dotenv.config();
database();
const app=express();

// logic for stripe ...
const stripe = new Stripe(process.env.STRIPE_KEY);
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_518fa780ddf52ebb3db060a6b3374f203a9bb78c02834b3b94783c1825051f71";

app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("🚀 ~ file: app.js:35 ~ app.post ~ event:", event)
  } catch (err) {
    console.log("🚀 ~ file: app.js:41 ~ app.post ~ err.message:", err.message)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.use(express.json());
app.use('/',userRoute);
app.use('/',productRoute);
app.use('/',categoryRoutes);
app.use('/',brandRoutes);
app.use('/',reviewRoutes);
app.use('/',orderRoutes);
export default app;