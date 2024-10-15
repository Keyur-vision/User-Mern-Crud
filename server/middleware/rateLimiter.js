const rateLimit  = require('express-rate-limit')

const limiter = rateLimit({
	windowMs : 60 * 1000, // 15 minutes
	limit: 5000,
    message: 'Too many requests, please try again later.',
})

module.exports = limiter



// 15 * 60 * 1000 // 15 minutes