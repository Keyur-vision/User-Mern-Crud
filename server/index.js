require('dotenv').config()
const connectMongoDB = require("./config/dbConnect.js")
const express = require("express");
const app = express();
const router = require("./routes/index.js");
const errorHandler = require("./errorHandling/errorMiddleware.js");
const limiter = require("./middleware/rateLimiter.js")
var cors = require('cors')

app.use(cors({ origin: "*" }));

app.use(errorHandler);

app.use("/img" ,express.static('public'))
app.use(express.json());
app.use("/api", router);
app.use("/", (req, res) => {
    res.send("hellow")
})

// connection
const URI = process.env.MONGO_URL
const PORT = process.env.PORT
connectMongoDB(URI)
    .then(() => {
        console.log('Database connected successfully!')
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    }).catch((err) => console.error("Coudn't connect database", err))


