const authService = require("../services/authService")
const { userSchema, loginSchema } = require("../schema/user")
const Cookies = require('cookies')

class AuthController {
    login = async (req, res, next) => {
        try {
            const payload = req.body
            loginSchema.parse(payload)
            const data = await authService.login(payload)
            const cookies = new Cookies(req, res);
            cookies.set('accessToken', data.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                path: '/',
            });
            cookies.set('refreshToken', data.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                path: '/',
            });
            res.json({
                message: data
            })
        } catch (error) {
            next(error)
        }

    }
    register = async (req, res, next) => {
        try {
            const payload = req.body
            userSchema.parse(payload)
            const data = await authService.register(payload)
            const cookies = new Cookies(req, res);

            cookies.set('accessToken', data.data.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                path: '/',
            });
            cookies.set('refreshToken', data.data.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                path: '/',
            });
            res.json({
                message: data
            })
        } catch (error) {
            next(error)
        }

    }
    verifyEmail = async (req, res, next) => {
        try {
            const { token } = req.body
            console.log({ token })
            await authService.verifyEmail(token)
            res.json({
                // data: response,
                message: "Email Verified Success"
            })

        } catch (error) {
            next(error)
        }

    }
}



const authController = new AuthController()


module.exports = authController