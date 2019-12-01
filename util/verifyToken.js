let jwt = require('jsonwebtoken');
const config = require('../configration/config.json');

let verifyToken = (req, res, next) => {
    const response = {};
    try{
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token) {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            jwt.verify(token, config.jwt.secret, (err, decoded) => {
                console.log(err,decoded);
                if (err) {
                    response.statusCode =401;
                    response.body = JSON.stringify({
                        message: 'Token is not valid',
                        data: ""
                    });
                    res.status(response.statusCode).send(response.body);
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    }
    catch(err)  {
        response.statusCode = 505;
        response.body = JSON.stringify({err});
        res.status(response.statusCode).send(response.body);
    }

};

module.exports = verifyToken;