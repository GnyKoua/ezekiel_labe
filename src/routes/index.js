import {
  Router
} from 'express'
import users from './users'
import commande from './commandes'
import {
  sendHttpError
} from '../middlewares'
import livreur from './livreur'
import disponibilite from './disponibilite'
import demandeLivraison from './demandeLivraison-Livraison'

const router = new Router

router.use(sendHttpError)
router.use('/users', users)

router.use('/commande', commande)

router.use('/livreur', livreur)

router.use('/disponibilite', disponibilite)

router.use('/demande-livraison', demandeLivraison)

export default router
