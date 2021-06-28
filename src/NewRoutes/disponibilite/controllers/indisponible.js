import db from "../../../models";
const sequelize = require("sequelize");
//import { sign } from '../../../services/jwt'
//import bcrypt from 'bcryptjs'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const Disponibilite = db.disponibilite;

    const disponibilite = await Disponibilite.update(
      {
        statut: 0,
        dateFin: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      { where: { liv_id: body.liv_id, dateFin: null } }
    );

    //const token = await sign(user.id)
    //body.nom
    return res.json({
      success: true,
      disponible: body,
      // token,
      id: disponibilite.disp_id,
    });
  } catch (err) {
    return next(err);
  }
};
