const User = require("../model/userSchema.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const  signIn = async (req, res) => {
    try {
       const findUser = await User.findOne({ email: req.body.email })
       if (!findUser) {
           return res.status(400).json({ message: "Invalid credentials" })
       }
       const isMatch = await bcrypt.compare(req.body.password, findUser.password);
       if (!isMatch) {
           return res.status(400).json({ message: "Invalid credentials" })
       }
  
       await  User.updateOne({_id : findUser._id} , {$set : {lastLogin : Date.now()}}) 
       const token = jwt.sign({ email: findUser.email }, process.env.SECRET_KEY, { expiresIn: '1h' }); 
       return res.status(200).json({ status : true , data: {firstName: findUser.firstName , lastName: findUser.lastName , email: findUser.email , username:findUser.userName} , token, massage: "Invalid credentials" })
   
    } catch (error) {
       console.log(error)
    }
   }

   module.exports = {
    signIn
   }