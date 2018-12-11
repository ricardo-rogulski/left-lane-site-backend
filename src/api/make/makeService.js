const Make = require('./make')
const errorHandler = require('../common/errorHandler')

Make.methods(['get'])
Make.updateOptions({new: true, runValidators: true})
Make.after('post', errorHandler).after('put', errorHandler)

Make.route('count', (req, res, next) => {
    Make.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})


//Make.route('summary', (req, res, next) => {
//    Make.aggregate({
//        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
//    }, {
//        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
//    }, {
//        $project: {_id: 0, credit: 1, debt: 1}
//    }, (error, result) => {
//        if(error) {
//            res.status(500).json({errors: [error]})
//        } else {
//            res.json(result[0] || { credit: 0, debt: 0 })
//        }
//    })
//})


module.exports = Make