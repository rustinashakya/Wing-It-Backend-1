
const User = require("../models/userModal")
const ServerError = require('../utils/serverError')
const { generateAccessToken, generateVerificationToken, generateRefreshToken, verifyEmailVerificationToken } = require("../utils/token")
const sendDynamicEmail = require('../helpers/mail/index')
const bcrypt = require('bcrypt');
const pug = require('pug');
const environments = require("../config/environment");


// const cookies = new Cookies()
class AuthService {
    register = async (payload) => {
        // const data = payload

        const user = await User.find({
            email: payload.email
        })
        if (user.length > 0) {
            throw new ServerError("Email already exists", 409);
        }
        const hashPassword = bcrypt.hashSync(payload.password, 10)

        const newPayload = {
            ...payload, password: hashPassword
        }

        const newUser = await User.create(newPayload)

        // token
        const accessToken = generateAccessToken({
            id: newUser._id
        })
        const refreshToken = generateRefreshToken({
            id: newUser._id
        })

        const verificationToken = generateVerificationToken({
            id: newUser._id
        })



        // transport.sendMail({
        //     from: "info@khem.com",
        //     to: newUser.email,
        //     subject: "Hello from Mailtrap",
        //     text: "This is a test e-mail message."
        // }, (error, info) => {
        //     if (error) {
        //         return console.log(error);
        //     }
        //     console.log("Message sent: %s", info.messageId);
        // });
        const html = pug.renderFile('./src/helpers/template/verifyEmail.pug', {
            name: newUser.name,
            verificationUrl: `${environments.frontendVerifyUrl}?token=${verificationToken}`,
            expiryHours: 1
        });
        sendDynamicEmail("", newUser?.email, "this is test subject", html)



        return {
            data: {
                accessToken, refreshToken
            },
            message: "user register successful"
        }

    }
    verifyEmail = async (token) => {
        try {
            // jwt verify 
            const decoded = verifyEmailVerificationToken(token)
            console.log("verify", decoded)
            if (decoded.id) {
                await User.updateOne({
                    _id: decoded.id
                }, {
                    isVerified: true
                },)
            }

        } catch (error) {
            throw error
        }
    }
    login = async (payload) => {
        // 1. check user
        const user = await User.findOne({
            email: payload.email
        })
        if (!user) {
            throw new ServerError("User does not exist", 401)
        }
        if (!user?.isVerified) {
            throw new ServerError("Please verify email", 401)
        }
        // 2. password verify
        const isVerifiedPassword = bcrypt.compareSync(payload.password, user.password)

        if (!isVerifiedPassword) {
            throw new ServerError("Password does not match", 401)
        }
        /// token generate
        const accessToken = generateAccessToken({
            id: user._id
        })
        const refreshToken = generateRefreshToken({
            id: user._id
        })
        return {
            accessToken, refreshToken, user: {
                name: user.name
            }
        }
    }
}



const authService = new AuthService()


module.exports = authService