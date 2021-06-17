import db from "../../../models";
const sequelize = require("sequelize");
//import { sign } from '../../../services/jwt'
//import bcrypt from 'bcryptjs'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const Livreur = db.livreur;

    const livreur = await Livreur.update(
      {
        disponibilite: 0,
        dateFin: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      { where: { liv_id: body.liv_id, dateFin: null } }
    );

    //const token = await sign(user.id)
    //body.nom
    return res.json({
      success: true,
      livreur: body,
      // token,
      id: livreur.livreur_id,
    });
  } catch (err) {
    return next(err);
  }
};
