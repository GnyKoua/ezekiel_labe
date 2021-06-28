import db from "../../../models";

export default async ({
  bodymen: {
    body
  }
}, res, next) => {
  try {
    const DemandeLivraison = db.demandeLivraison;
    const StatutDemandeLivraison = db.statutDemandeLivraison;
    const StatutLivraison = db.statutLivraison;
    const Commande = db.commande;
    const Livreur = db.livreur;
    const Livraison = db.livraison;
    const Disponibilite = db.disponibilite;

    let livraison = await Livraison.findOne({
      where: {
        livraison_id: body.livraisonId
      }
    });
    if (livraison) {
      //Mise à jour du statut de la livraison
      await livraison.update({
        statutLivraison_id: 3
      });

      //Mise à jour du statut de la demande de livraison
      let demande = await DemandeLivraison.findOne({
        where: {
          demandeLivraison_id: livraison.demandeLivraison_id
        }
      });
      await demande.update({
        statutDemandeLivraison_id: 4
      });

      //Mise à jour du statut de la commande
      let commande = await Commande.findOne({
        where: {
          commande_id: demande.commande_id
        }
      });
      await commande.update({
        statutCommande_id: 3
      });

      
      //Mise à jour du statut de la disponibilité du livreur
      let dispoLivreur = await Disponibilite.findOne({
        where: {
          liv_id: demande.livreur_id
        }
      });
      await dispoLivreur.update({
        statut: 1
      });

      livraison = await Livraison.findOne({
        where: {
          livraison_id: body.livraisonId,
        },
        include: [{
          model: StatutLivraison,
          required: true,
          as: "statutLivraison"
        }, {
          model: DemandeLivraison,
          required: true,
          as: "demandeLivraison",
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
        }]
      });

      return res.json({
        success: true,
        message: `Livraison ${livraison.statutLivraison.libelle}`,
        livraison: livraison
      });

    } else {
      return res.status(500).json({
        success: false,
        message: `Livraison introuvable`,
        livraison: null
      });
    }

  } catch (err) {
    return next(err)
  }
}
