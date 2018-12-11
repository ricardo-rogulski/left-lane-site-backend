const restful = require('node-restful')
const mongoose = restful.mongoose

const modelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    searchActive: { type: Boolean, required: true },
    makeName: {type: String, required: true},
    makeId: {type: String, required: true}
})

module.exports = restful.model('Models', modelSchema)



