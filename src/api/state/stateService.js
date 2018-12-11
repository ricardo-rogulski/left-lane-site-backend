const State = require('./state')
const errorHandler = require('../common/errorHandler')

State.methods(['get'])
State.updateOptions({new: true, runValidators: true})
State.after('post', errorHandler).after('put', errorHandler)

State.route('count', (req, res, next) => {
    State.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = State