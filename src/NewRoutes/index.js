import {
  Router
} from 'express';
import expediteur from './expediteur';
import transporteur from './transporteur';
import {
  sendHttpError
} from '../middlewares';

const router = new Router();

router.use(sendHttpError);

router.use('/expediteur', expediteur);

router.use('/transporteur', transporteur);

export default router
