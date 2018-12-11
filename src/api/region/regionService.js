const Region = require('./region')
const errorHandler = require('../common/errorHandler')

Region.methods(['get'])
Region.updateOptions({new: true, runValidators: true})
Region.after('post', errorHandler).after('put', errorHandler)

Region.route('count', (req, res, next) => {
    Region.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = Region