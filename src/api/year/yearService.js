const Year = require('./year')
const errorHandler = require('../common/errorHandler')

Year.methods(['get'])
Year.updateOptions({new: true, runValidators: true})
Year.after('post', errorHandler).after('put', errorHandler)

Year.route('count', (req, res, next) => {
    Year.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = Year