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

    let demande = await DemandeLivraison.findOne({
      where: {
        livreurId: body.livreurId,
        demandeLivraison_id: body.demandeLivraisonId
      }
    });
    if (demande) {
      await demande.update({
        statutDemandeLivraison_id: 4
      });

      demande = await DemandeLivraison.findOne({
        where: {
          livreurId: body.livreurId,
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

      return res.json({
        success: true,
        message: `Demande ${demande.statutDemandeLivraison.libelle}`,
        demande: demande
      });

    } else {
      return res.status(500).json({
        success: false,
        message: `Demande introuvable`,
        demande: null
      });
    }

  } catch (err) {
    return next(err)
  }
}
