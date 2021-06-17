import { entrepriseCommande, particulierCommande} from './controllers'
import { Router } from 'express'
import  {middleware as body } from 'bodymen'
//import { INTEGER } from 'sequelize/types'
//import { token } from '../../services/passport'
const controllers = require('./controllers/getCommande')
const router = new Router()

router.post('/entreprise/commande',
    body({

        adresseDepart: {
            type: String,
            required: true
        },
        adresseArrivee: {
            type: String,
            required: true
        },
        natureArticle: {
            type: String,
            required: true
        },
        nombreChariot: {
            type: Number,
            required: false
        },
        TotalColis: {
            type: Number,
            required: false
        },
        PoidsTotalColis: {
            type: Number,
            required: false
        },
        commentaire: {
            type: String,
            required: true
        },

    }),
    entrepriseCommande)

    router.post('/commande/particulier',
    body({

        adresseDepart: {
            type: String,
            required: true
        },
        adresseArrivee: {
            type: String,
            required: true
        },
        natureArticle: {
            type: String,
            required: true
        },
        nombreChariot: {
          type: Number,
          required: false
      },
      TotalColis: {
          type: Number,
          required: false
      },
      PoidsTotalColis: {
          type: Number,
          required: false
      },
        commentaire: {
            type: String,
            required: true
        },


    }),
    particulierCommande)

 router.get('/commande', controllers.getCommande)

export default router
