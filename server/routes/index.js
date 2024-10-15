const express = require("express");
const router = express.Router();
const  user = require("./user.js")
const auth = require("./auth.js")

router.use("/user" , user)
router.use("/user" , auth)

module.exports = router
