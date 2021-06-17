import { enterpriseRegistration, uploadFilesEnterprise, login, getUser, clientRegistration } from './controllers'
import { Router } from 'express'
import  {middleware as body } from 'bodymen'
//import { INTEGER } from 'sequelize/types'
import { token } from '../../services/passport'


const router = new Router()

router.post('/enterprise/registration',
    body({

        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        adresse: {
            type: String,
            required: true
        },
        denomination: {
            type: String,
            required: true
        },
        activite: {
            type: String,
            required: true
        },
        vehicule: {
            type: String,
            required: true
        },
        status:{
            type: String,
            required: true
        },
        siret: {
            type: String,
            required: true
        },
        representant: {
            type: String,
            required: true
        },

        assurance: {
            type: String,
            required: true
        },
        adresseFacturation: {
            type: String,
            required: true
        }
    }),
    enterpriseRegistration)

    router.put('/enterprise/uploadfile',
    token({ required: true }),
    uploadFilesEnterprise)


    router.post('/login',
    body({
        email: {
        type: String,
        required: true
       },
       password: {
        type: String,
        required: true
        }
    }),
    login)

    router.get('/get',
   token({ required: true }),
    getUser)


//route pour client

router.post('/client/registration',
body({
    nom: {
      type: String,
      required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },

}),
clientRegistration)



export default router
