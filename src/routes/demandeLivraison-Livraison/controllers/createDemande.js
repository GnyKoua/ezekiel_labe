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

    const asDemForThisCom = await DemandeLivraison.findOne({
      where: {
        commande_id: body.commandeId,
        livreur_id: body.livreurId,
        [Op.or]: [{
            statutDemandeLivraison_id: 1
          },
          {
            statutDemandeLivraison_id: 2
          }
        ]
      },
      include: [{
        model: StatutDemandeLivraison,
        required: true,
        as: "statutDemandeLivraison"
      }]
    });

    if (asDemForThisCom) {
      return res.status(500).json({
        success: false,
        message: `Cette commande est déjà *${asDemForThisCom.statutDemandeLivraison.libelle}*`,
        demande: null
      });
    } else {
      const demande = await DemandeLivraison.create({
        statutDemandeLivraison_id: 1,
        commande_id: body.commandeId,
        livreur_id: body.livreurId,
        distance: body.distance,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      //Mise à jour du statut de la commande
      let commande = await Commande.findOne({
        where: {
          commande_id: demande.commande_id
        }
      });
      await commande.update({
        statutCommande_id: 2
      });

      let demandeRes = await DemandeLivraison.findOne({
        where: {
          demandeLivraison_id: demande.demandeLivraison_id,
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

      return res.json({
        success: true,
        message: `Demande ${demandeRes.statutDemandeLivraison.libelle}`,
        demande: demandeRes
      });
    }

  } catch (err) {
    return next(err)
  }
}
