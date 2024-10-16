require('dotenv').config()
require("./config/dbConnect.js");
const express = require("express");
const app = express();
const router = require("./routes/index.js");
const errorHandler = require("./errorHandling/errorMiddleware.js");
const limiter = require("./middleware/rateLimiter.js")
var cors = require('cors')
const PORT = process.env.PORT || 7070;

app.use(cors());
app.use(errorHandler);
app.use("/img" ,express.static('public'))
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})