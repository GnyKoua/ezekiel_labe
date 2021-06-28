import db from "../../../models";
//import { sign } from '../../../services/jwt'
//import bcrypt from 'bcryptjs'
const sequelize = require("sequelize");

export default async ({
  bodymen: {
    body
  }
}, res, next) => {
  try {
    const Disponibilite = db.disponibilite;

    let disponibilite = await Disponibilite.findOne({
      where: {
        liv_id: body.liv_id
      }
    });

    if (disponibilite) {
      await disponibilite.update({
        statut: 1,
        longitude: body.longitude,
        latitude: body.latitude,
        dateDebut: sequelize.literal("CURRENT_TIMESTAMP"),
        dateFin: null
      });
    } else {

      disponibilite = await Disponibilite.create({
        statut: 1,
        // latitude: body.latitude,
        //  longitude: body.longitude,

        dateDebut: sequelize.literal("CURRENT_TIMESTAMP"),
        liv_id: body.liv_id,
        // latitude: 48.9505,
        // longitude: 2.91103,
        latitude: body.latitude,
        longitude: body.longitude,
        //dateFin: sequelize.literal("CURRENT_TIMESTAMP"),
      });
    }

    // const token = await sign(user.id)
    //body.nom
    return res.json({
      success: true,
      disponibilite: body,
      // token,
      id: disponibilite.disp_id,
    });
  } catch (err) {
    return next(err);
  }
};
