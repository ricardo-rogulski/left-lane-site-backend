const restful = require('node-restful')
const mongoose = restful.mongoose


const imageSchema = new mongoose.Schema({
    order: { type: Number, required: true }, 
    source: { type: String, required: true },
})

const carSchema = new mongoose.Schema({
    makeId: {type: String, required: true}, 
    modelId: {type: String, required: true},
    userId: {type: String, required: true},
    description: { type: String, required: true },
    acessoryDescription: { type: String, required: false },
    yearMade: { type: Number, required: true },
    yearModel: { type: Number, required: true },
    mileage: { type: Number, required: true },
    price: { type: Number, required: true },
    isArmored: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true },
    images: [imageSchema]
    
})

module.exports = restful.model('cars', carSchema)