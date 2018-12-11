const Price = require('./price')
const errorHandler = require('../common/errorHandler')

Price.methods(['get'])
Price.updateOptions({new: true, runValidators: true})
Price.after('post', errorHandler).after('put', errorHandler)

Price.route('count', (req, res, next) => {
    Price.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = Price