const { celebrate, Segments, Joi } = require('celebrate')
const express = require('express')


const OngController = require('./controllers/ongController')
const incidentController = require('./controllers/incidentController')
const profileController = require('./controllers/profileController')
const sessionController = require('./controllers/sessionController')


const routes = express.Router()

//Rota de listagem
routes.get('/ongs', OngController.index)
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), incidentController.index)

//rota de Cadastro
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })

}), OngController.create)
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}), incidentController.create)

//Rota Delete
routes.delete("/incidents/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentController.delete)


//rota profileController aka Login
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), profileController.index)

//rota de login
routes.post('/sessions', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), sessionController.create)


module.exports = routes