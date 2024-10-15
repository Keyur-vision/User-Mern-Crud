const jwt = require("jsonwebtoken")

module.exports = () => async (req, res, next) => {

  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(400).send({ message: 'Authorization token is required.' });
  }
  try {
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.email;
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Invalid token.' });
  }
}   