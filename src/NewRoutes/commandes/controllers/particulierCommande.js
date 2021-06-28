import db from '../../../models'
//import { sign } from '../../../services/jwt'
//import bcrypt from 'bcryptjs'


export default async ({
  bodymen: {
    body
  }
}, res, next) => {
  try {
    const Commande = db.commande

    const commande = await Commande.create({
      adresseDepart: body.adresseDepart,
      adresseArrivee: body.adresseDepart,
      natureArticle: body.natureArticle,
      nombreChariot: body.nombreChariot,
      TotalColis: body.TotalColis,
      PoidsTotalColis: body.PoidsTotalColis,
      commentaire: body.commentaire,
      commandeType: 'particulier',
      statutCommande_id: 1
    })

    //const token = await sign(user.id)
    //body.nom
    return res.json({
      success: true,
      users: body,
      // token,
      id: commande.id
    })

  } catch (err) {
    return next(err)
  }
}










{
  /*


  export default async ({ bodymen: { body } }, res, next) => {
      try {
          const User = db.user

          const res = await User.create({

          })

          //body.nom
          return res.json({
              success: true,
              users: body
          })

      } catch (err) {
          return next(err)
      }
  }
  */
}
