const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 6, max: 1000, required: true },
    tel: { type: String, min: 10, max: 16, required: true },
    isActive: { type: Boolean, required: true },
    stateId: {type: String, required: true}, 
    cityId: {type: String, required: true}
})

module.exports = restful.model('users', userSchema)