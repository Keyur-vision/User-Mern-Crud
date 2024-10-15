const Joi = require('joi');

const user = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    mobile_no: Joi.number().required(),
    userName: Joi.string().required(),
    dob: Joi.date().required(),
    profile: Joi.required(),
    age: Joi.number().integer().required(), 
    createdAt: Joi.date().default(Date.now),
    updatedAt: Joi.date().default(Date.now),
    lastLogin: Joi.string(),  
    isActive: Joi.boolean().default(true)
});

const auth = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

module.exports = {user , auth};
