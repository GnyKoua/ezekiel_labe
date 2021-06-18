import db from '../../../models'
const sequelize = require("sequelize");


export default async ({
  bodymen: {
    body
  }
}, res, next) => {
  try {
    const Commande = db.commande

    const commande = await Commande.create({
      adresseDepart: body.adresseDepart,
      adresseArrivee: body.adresseArrivee,
      natureArticle: body.natureArticle,
      nombreChariot: body.nombreChariot,
      TotalColis: body.TotalColis,
      PoidsTotalColis: body.PoidsTotalColis,
      commentaire: body.commentaire,
      commandeType: 'entreprise',
      statutCommande_id: 1
    })

    return res.json({
      success: true,
      users: body,
      commande: commande
    })

  } catch (err) {
    return next(err)
  }
}
