const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/allUsers").then(() => {
  console.log("Database connected....")
});
