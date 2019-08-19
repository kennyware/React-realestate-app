const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token  = req.header('access_token');

    if(!token) return res.status(401).json({ msg: 'No token found, unauthorized access.'})

    try {
        const verifiedToken = jwt.verify(token, config.get('jwtSecret'));
        req.user = verifiedToken;
        next();
    } catch(e) {
        res.status(400).json({ msg: 'Token is invalid.'})
    }
}

module.exports = auth;