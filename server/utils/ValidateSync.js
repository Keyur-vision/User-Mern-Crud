
let validation = require("./validation/index.js")
module.exports = (validatereq) => async (req, res, next) => {
  if (!validation[validatereq]) {
    return res.status(401).json({ status: false, massage: "validation request not send" })
  }
  try {
    await validation[validatereq].validateAsync(req.body );
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }

}

