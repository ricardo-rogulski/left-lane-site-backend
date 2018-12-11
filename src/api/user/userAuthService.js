const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const user = require('./user')
const env = require('../../.env')

//Regex para validar email e senha.
//const emailRegex = /\S+@\S+\.\S+/
//const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/
const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /(?=.*[a-z])/


//Esquema para tratar os erros de BD.
const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({ errors })
}

//Método de login
const login = (req, res, next) => {
    const email = req.body.email || ''
    const password = req.body.password || ''

    user.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        //} else if (user ) {    
        } else if (user && bcrypt.compareSync(password, user.password)) {
        
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: "7 days"
            })
            const { name, email } = user
            res.json({ name, email, token })
        } else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
        }
    })

}

//Validação do token
const validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}


const signup = (req, res, next) => {

    const name = req.body.user.name || ''
    const email = req.body.user.email || ''
    const password = req.body.user.password || ''
    //const confirmPassword = req.body.confirm_password || ''
    const confirmPassword = password

    //Verifica se o e-mail é válido.
    //if(!email.match(emailRegex)) {
    //    return res.status(400).send({errors: ['O e-mail informado está inválido']})
    //}
    
    //Verifica se a senha é válida.
    //if(!password.match(passwordRegex)) {
    //    return res.status(400).send({errors: [
    //        "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20."
    //    ]})
    //}

    //Verifica se a senha confere com a confirmação.
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if(!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({errors: ['Senhas não conferem.']})
    }

    //Verifica se o usuário já existe.
    AdminUser.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
        } else {
            const newUser = new AdminUser({ name, email, password: passwordHash })
            newUser.save(err => {
                if (err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    return res.status(200).send({ newUser })
                }
            })
        }
    })
}

const change = (req, res, next) => {

    const name = req.body.user.name || ''
    const email = req.body.user.email || ''
    const password = req.body.user.password || ''

    //Verifica se a senha confere com a confirmação.
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)

    //Verifica se o usuário já existe.
    AdminUser.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            user.name = name
            user.password = passwordHash
            
            user.save(err => {
                if (err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    return res.status(200).send({ user })
                }
            })
        }
    })
}


module.exports = { login, signup, validateToken, change }


