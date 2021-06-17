import db from "../../../models";
//import { sign } from '../../../services/jwt'
//import bcrypt from 'bcryptjs'
const sequelize = require("sequelize");

module.exports.getCommande = async(req, res, next) =>{

  try {

    const Commande = db.commande

    const resCommande = await Commande.findAll();
    console.log(resCommande.every(data => data instanceof Commande)); // true
    console.log("All data:", JSON.stringify(resCommande, null, 2));

    return res.json(resCommande)

    } catch (err) {
      return next(err)
  }
}



/*
export default async ({ bodymen: { body } }, res, next) => {
  try {

    return res.json('hello')
    /*  const Commande = db.commande

      const commande = await Commande.get({
              adresseDepart: body.adresseDepart,
              adresseArrivee: body.adresseArrivee,
              natureArticle: body.natureArticle,
              nombreChariot: body.nombreChariot,
              TotalColis: body.TotalColis,
              PoidsTotalColis: body.PoidsTotalColis,
              commentaire: body.commentaire,
          },

            { where: { id: body.id } }

          );

      return res.json({
          success: true,
          users: body,
        // token,
       id: commande.commande_id
      })

    } catch (err) {
      return next(err)
  }
}
*/



