const z = require('zod')


const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
});


const loginSchema = z.object({
    email: z.string(),
    password: z.string()
});






module.exports = { userSchema, loginSchema }