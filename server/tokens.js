const {sign} = require('jsonwebtoken');

const createAccessToken = userId => {
    return sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
};

const createRefreshToken = userId => {
    return sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });
};

const sendAccessToken = (req, res, accesstoken) => {
    res.json({accesstoken, username: req.body.username});
} 
const sendRefreshToken = (res, refreshtoken) => {
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/api/auth/refresh_token',
    });
}
module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}