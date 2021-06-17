import {
  Router
} from "express";
import {
  middleware as body
} from 'bodymen';
import createDemande from "./controllers/createDemande";
import findDemande from "./controllers/findDemande";
import findLivreurActiveDemande from "./controllers/findLivreurActiveDemande";
import endDemande from "./controllers/endDemande";
import rejectDemande from "./controllers/rejectDemande";
import validDemande from "./controllers/validDemande";
import startLivraison from "./controllers/startLivraison";
import endLivraison from "./controllers/endLivraison";


const router = new Router();

router.post('/create',
  body({
    commandeId: {
      type: Number,
      required: true
    },
    livreurId: {
      type: Number,
      required: true
    },
    distance: {
      type: Number,
      required: true
    }
  }), createDemande)

router.post('/find',
  body({
    demandeLivraisonId: {
      type: Number,
      required: true
    }
  }), findDemande)

router.post('/findLivreurActiveDem',
  body({
    livreurId: {
      type: Number,
      required: true
    }
  }), findLivreurActiveDemande)

router.post('/valid',
  body({
    demandeLivraisonId: {
      type: Number,
      required: true
    },
    livreurId: {
      type: Number,
      required: true
    }
  }), validDemande)

router.post('/reject',
  body({
    demandeLivraisonId: {
      type: Number,
      required: true
    },
    livreurId: {
      type: Number,
      required: true
    }
  }), rejectDemande)

router.post('/endDemande',
  body({
    demandeLivraisonId: {
      type: Number,
      required: true
    },
    livreurId: {
      type: Number,
      required: true
    }
  }), endDemande)

router.post('/startLivraison',
  body({
    livraisonId: {
      type: Number,
      required: true
    }
  }), startLivraison)

router.post('/endLivraison',
  body({
    livraisonId: {
      type: Number,
      required: true
    }
  }), endLivraison)

export default router
