import {
  disponible,
  indisponible
  //getdispo

} from "./controllers";
import {
  Router
} from 'express';
import {
  middleware as body
} from 'bodymen';
import getLivreurDispoForOrder from "./controllers/getLivreurDispoForOrder";
//import { INTEGER } from 'sequelize/types'
//import { INTEGER } from 'sequelize/types'
//import { token } from '../../services/passport'
const controllers = require('./controllers/getDispo')

const router = new Router();


router.post("/livcommande", body({
  commandeId: {
    type: Number,
    required: true,
  }
}), getLivreurDispoForOrder);


router.post(
  "/disponible/livreur",
  body({

    liv_id: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
      //  defaultValue: 2.9110
    },
    latitude: {
      type: Number,
      required: true,
      //  defaultValue: 48.9505
    },


  }),
  disponible
);

router.get('/ok', controllers.getDispo);

//router.get('/distance', controllers.disponi)

router.put(
  "/disponible/update/inactif",
  body({
    liv_id: {
      type: Number,
      required: true,
    },
  }),
  indisponible
);

export default router
