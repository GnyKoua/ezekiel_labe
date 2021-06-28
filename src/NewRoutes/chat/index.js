import {
  Router
} from "express";
import {
  middleware as body
} from 'bodymen';

import sendMessage from "./controllers/sendMessage";


const router = new Router();

router.post('/sendMessage',
  body({
    numeroCommande: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    sender_id: {
      type: Number,
      required: true
    },
    livreur_id: {
      type: Number,
      required: true
    },
    user_id: {
      type: Number,
      required: true
    }
  }), sendMessage)

export default router
