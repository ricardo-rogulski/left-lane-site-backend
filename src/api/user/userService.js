const User = require('./user')
const errorHandler = require('../common/errorHandler')

User.methods(['get', 'post', 'put'])
User.updateOptions({new: true, runValidators: true})
User.after('post', errorHandler).after('put', errorHandler)

User.route('count', (req, res, next) => {
    User.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = User