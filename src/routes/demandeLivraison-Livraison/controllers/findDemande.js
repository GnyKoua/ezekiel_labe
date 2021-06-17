import {
  Op
} from "sequelize";
import db from "../../../models";

export default async ({
  bodymen: {
    body
  }
}, res, next) => {
  try {
    const DemandeLivraison = db.demandeLivraison;
    const StatutDemandeLivraison = db.statutDemandeLivraison;
    const Commande = db.commande;
    const Livreur = db.livreur;

    const demande = await DemandeLivraison.findOne({
      where: {
        demandeLivraison_id: body.demandeLivraisonId,
      },
      include: [{
          model: StatutDemandeLivraison,
          required: true,
          as: "statutDemandeLivraison"
        },
        {
          model: Commande,
          required: true,
          as: "commande"
        },
        {
          model: Livreur,
          required: true,
          as: "livreur"
        }
      ]
    });
    return res.json(demande);

  } catch (err) {
    return next(err)
  }
}
