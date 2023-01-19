const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51M0divBS3QPbXiTKhgN1IFCkxk66gbSZ2FDVm1tE38FiDI9644NqyCIwySwcuEyXumT48NzjGlT4oWQmuGyTTNjQ00HC9XDzL7"
);

// api

// app config
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("🚀 ~ file: index.js:23 ~ app.post ~ total", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//listen command
exports.api = functions.https.onRequest(app);

// Example Endpoint
//(http://127.0.0.1:5001/clone-7eb96/us-central1/api
