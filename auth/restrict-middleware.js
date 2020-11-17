const jwt = require('jsonwebtoken');
const secret = require("../secrets");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token || !req.headers.authorization) {
        return res.status(401).json({ message: 'pls login again to get a token'})
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            console.log('decode error =>', err);
            return res.status(401).json({ message: 'Invalid token, pls login again' })
        }
        console.log('decoded token =>', decoded)
        req.decodedJwt = decoded
        next()
    })
}