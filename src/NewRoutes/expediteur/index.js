import {
  enterpriseRegistration,
  uploadFilesEnterprise,
  login,
  clientRegistration
} from './controllers';
import {
  Router
} from 'express';
import {
  middleware as body
} from 'bodymen';
import {
  token
} from '../../services/passport';


const router = new Router();


//Route pour client entreprise
router.post('/entreprise/registration',
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
  enterpriseRegistration);


//Route pour client particulier
router.post('/client/registration',
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
  }),
  clientRegistration);


router.put('/uploadfile',
  token({
    required: true
  }),
  uploadFilesEnterprise);


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


export default router
