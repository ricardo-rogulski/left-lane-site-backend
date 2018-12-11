const restful = require('node-restful')
const mongoose = restful.mongoose

const yearSchema = new mongoose.Schema({
    name: { type: String, required: true },
    searchActive: { type: Boolean, required: true }
})

module.exports = restful.model('Year', yearSchema)



