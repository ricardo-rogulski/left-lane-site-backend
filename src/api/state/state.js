const restful = require('node-restful')
const mongoose = restful.mongoose

const stateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    searchActive: { type: Boolean, required: true }
})

module.exports = restful.model('States', stateSchema)



