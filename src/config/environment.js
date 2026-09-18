const { configDotenv } = require('dotenv')
configDotenv()

const environments = {
    port: process.env.PORT || 4000,
    dbUrl: process.env.DB_URL,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET_KEY,
    accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRE,
    verificationTokenExpireTime: process.env.VERIFICATION_TOKEN_EXPIRE,
    refreshTokenExpireTime: process.env.REFRESH_TOKEN_EXPIRE,
    mailtrapUserId: process.env.MAILTRAP_USER_ID,
    mailtrapPassword: process.env.MAILTRAP_PASSWORD,
    frontendVerifyUrl:process.env.FRONTEND_VERIFY_URL

}



module.exports = environments