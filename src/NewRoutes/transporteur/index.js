import {
  livreurIndependant,
  entrepriseTransport
} from "./controllers";
import {
  Router
} from "express";
import {
  middleware as body
} from "bodymen";
import login from "./controllers/login";

const router = new Router();

router.post("/livreurIndependant",
  body({
    nom: {
      type: String,
      required: true
    },
    prenoms: {
      type: String,
      required: true
    },
    dateNaissance: {
      type: String,
      required: true
    },
    adresse: {
      type: String,
      required: true
    },
    telephone: {
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
    typeVehicule: {
      type: String,
      required: true,
    },
    marqueVehicule: {
      type: String,
      required: true,
    },
    matriculeVehicule: {
      type: String,
      required: true,
    },
    assuranceVehicule: {
      type: String,
      required: true,
    },
    assuranceMarch: {
      type: String,
      required: true,
    },
  }),
  livreurIndependant);


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
  login);


router.post(
  "/entreprise/registration",
  body({
    statutEntreprise: {
      type: String,
      required: true
    },
    denomination: {
      type: String,
      required: true
    },
    siret: {
      type: String,
      required: true
    },
    tva: {
      type: String,
      required: true
    },
    secteurs: {
      type: String,
      required: true
    },
    nomRepresentant: {
      type: String,
      required: true
    },
    adresseSociale: {
      type: String,
      required: true
    },
    adresseEtab: {
      type: String,
      required: true
    },
    adresseFacturation: {
      type: String,
      required: true
    },
    personneContact: {
      type: String,
      required: true
    },
    telephone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    emailSecondaire: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    }
  }),
  entrepriseTransport);

export default router;
