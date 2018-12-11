const Mileage = require('./mileage')
const errorHandler = require('../common/errorHandler')

Mileage.methods(['get'])
Mileage.updateOptions({new: true, runValidators: true})
Mileage.after('post', errorHandler).after('put', errorHandler)

Mileage.route('count', (req, res, next) => {
    Mileage.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = Mileage