const mongoose = require("mongoose");
console.log("MONGO_URL:", process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);
console.log("hello db is working");
