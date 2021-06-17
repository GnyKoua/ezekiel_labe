import db from "../../../models";
//import { sign } from '../../../services/jwt'
//import bcrypt from 'bcryptjs'
const sequelize = require("sequelize");

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const Livreur = db.livreur;

    const livreur = await Livreur.create({
      disponibilite: 1,
      dateDebut: sequelize.literal("CURRENT_TIMESTAMP"),
      liv_id: body.liv_id
      //dateFin: sequelize.literal("CURRENT_TIMESTAMP"),
    },

  );

    //const token = await sign(user.id)
    //body.nom
    return res.json({
      success: true,
      livreur: body,
      // token,
      id: livreur.liv_id,
    });
  } catch (err) {
    return next(err);
  }
};
