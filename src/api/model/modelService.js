const Model = require('./model')
const errorHandler = require('../common/errorHandler')

Model.methods(['get'])
Model.updateOptions({new: true, runValidators: true})
Model.after('post', errorHandler).after('put', errorHandler)

Model.route('count', (req, res, next) => {
    Model.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = Model