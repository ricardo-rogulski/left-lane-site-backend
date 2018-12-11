const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

    /*
     * Rotas abertas.
     */
    const openApi = express.Router()
    server.use('/api', openApi)

    const AuthService = require('../api/user/userAuthService')
    //openApi.post('/login', AuthService.login)
    //openApi.post('/signup', AuthService.signup)
    //openApi.post('/validateToken', AuthService.validateToken)
    //openApi.put('/change', AuthService.change)
    

    // Routes to Make entity
    const Make = require('../api/make/makeService')
    Make.register(openApi, '/makes')
    
    // Routes to Models entity
    const Model = require('../api/model/modelService')
    Model.register(openApi, '/models')

    // Routes to Year entity
    const Year = require('../api/year/yearService')
    Year.register(openApi, '/years')

    // Routes to Mileage entity
    const Mileage = require('../api/mileage/mileageService')
    Mileage.register(openApi, '/mileages')

    // Routes to Price entity
    const Price = require('../api/price/priceService')
    Price.register(openApi, '/prices')

    // Routes to State entity
    const State = require('../api/state/stateService')
    State.register(openApi, '/states')
    
    // Routes to Region entity
    const Region = require('../api/region/regionService')
    Region.register(openApi, '/regions')
    
    
  
    /*
     * Rotas protegidas por Token JWT
     */
    //const protectedApi = express.Router()
    //server.use('/api', protectedApi)

    //Dessa maneira todas as rotas que usem protectedApi vão passar pelo middleware auth.
    //protectedApi.use(auth)
    





 

}