import { livreurIndependant, livreurEntreprise, getLivreur, uploadfileLivInd, loginliv, uploadfileEntrpTp,indisponibleLiv, disponibleLiv} from "./controllers";
import { Router } from "express";
import { middleware as body } from "bodymen";
//import { INTEGER } from 'sequelize/types'
import { tokenLivreur } from '../../services/passportLivreur'

const router = new Router();

router.post("/livreurInd",
  body({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    numero: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
      required: true,
    },
    denomination: {
      type: String,
      required: true,
    },
    activite: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    siret: {
      type: String,
      required: true,
    },
    vehicule: {
      type: String,
      required: true,
    },
    representant: {
      type: String,
      required: true,
    },
    assurance: {
      type: String,
      required: true,
    },
    adresseFacturation: {
      type: String,
      required: true,
    },
  }),
  livreurIndependant);

  router.put('/livreur/Independants',
  tokenLivreur({ required: true }),
  uploadfileLivInd)


  router.post('/logins',
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
  loginliv)

  router.get('/get',
  tokenLivreur({ required: true }),
  getLivreur)


  router.post(
    "/livreur/entreprise",
    body({
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      numero: {
        type: String,
        required: true,
      },
      adresse: {
        type: String,
        required: true,
      },
      denomination: {
        type: String,
        required: true,
      },
      activite: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      siret: {
        type: String,
        required: true,
      },
      vehicule: {
        type: String,
        required: true,
      },
      representant: {
        type: String,
        required: true,
      },
      assurance: {
        type: String,
        required: true,
      },
      adresseFacturation: {
        type: String,
        required: true,
      },
    }),
    livreurEntreprise);

    router.put('/livreurEntreprise',
    tokenLivreur({ required: true }),
    uploadfileEntrpTp)


    router.post(
      "/disponible",
      body({

        liv_id: {
          type: Number,
          required: true,
        },
      }),
      disponibleLiv
    );

    router.put(
      "/indisponible",
      body({
        liv_id: {
          type: Number,
          required: true,
        },
      }),
      indisponibleLiv
    );


export default router;
