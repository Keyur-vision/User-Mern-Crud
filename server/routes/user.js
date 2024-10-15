const express = require("express");
const router = express.Router();
const multer = require('multer');
const { getUser, addUser, editUser, deleteUser, singleUser, getLoginUser } = require("../controller/userController");
const validate = require("../utils/ValidateSync.js");
const limiter = require("../middleware/rateLimiter.js");
const authorization = require("../middleware/authentication.js")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    req.body.profile = file.originalname;
    cb(null, file.originalname )
  }
})

const upload = multer({ storage: storage }) 

router.get("/", limiter, authorization(), getUser)
router.get("/lastLoginusers",  getLoginUser)
router.get('/:id', singleUser);
router.post("/create",  upload.single("profile"),  validate("user"), addUser)
router.patch("/edit/:id", authorization(), upload.single("profile"), editUser)
router.delete("/delete/:id", authorization(), deleteUser)

module.exports = router
