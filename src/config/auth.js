const jwt = require('jsonwebtoken')
const env = require('../.env')


module.exports = (req, res, next) => {
    // CORS preflight request
    if (req.method === 'OPTIONS') {
        next()
    } else {
        const token = req.headers.authorization.split('Bearer ')[1]
        if (!token) {
            return res.status(403).send({ errors: ['Nooo token provided.'] })
        }
        console.log(token)
        jwt.verify(token, env.authSecret, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: ['Failed to authenticate token.']
                })
            } else {
                //req.decoded = decoded
                next()
            }
        })
    }
}