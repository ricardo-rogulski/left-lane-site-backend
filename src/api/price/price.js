const restful = require('node-restful')
const mongoose = restful.mongoose

const priceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    searchActive: { type: Boolean, required: true },
    minValue: {type: Number, required: true},
    maxValue: {type: Number, required: true}
})

module.exports = restful.model('Prices', priceSchema)



