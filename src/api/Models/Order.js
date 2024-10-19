const { Schema, model, Types } = require("mongoose");

const OrderSchema = new Schema(
  {
    course: {
      type: Types.ObjectId,
      required: true,
      ref: "Course",
    },
    transactionId: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = model("Order", OrderSchema);
module.exports = Order;
