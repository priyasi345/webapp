const mongoose = require("mongoose");

const Order = mongoose.model("Order", {
    status: String,
    foodName: String,
    amount: String
});

module.exports = Order;
