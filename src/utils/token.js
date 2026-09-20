var jwt = require("jsonwebtoken");
const environments = require("../config/environment");

const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, environments.jwtAccessSecret, {
    expiresIn: environments.accessTokenExpireTime,
  });
  return token;
};

const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, environments.jwtAccessSecret, {
    expiresIn: environments.refreshTokenExpireTime,
  });
  return token;
};

const generateVerificationToken = (payload) => {
  const token = jwt.sign(payload, environments.jwtAccessSecret, {
    expiresIn: environments.verificationTokenExpireTime,
  });
  return token;
};

const verifyEmailVerificationToken = (token) => {
  return jwt.verify(token, environments.jwtAccessSecret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateVerificationToken,
  verifyEmailVerificationToken,
};
