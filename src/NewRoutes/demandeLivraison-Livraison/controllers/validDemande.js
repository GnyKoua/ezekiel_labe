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
    const Livraison = db.livraison;
    const Disponibilite = db.disponibilite;
    const StatutLivraison = db.statutLivraison;

    let demande = await DemandeLivraison.findOne({
      where: {
        livreur_id: body.livreurId,
        demandeLivraison_id: body.demandeLivraisonId
      }
    });
    if (demande) {
      await demande.update({
        statutDemandeLivraison_id: 2
      });

      demande = await DemandeLivraison.findOne({
        where: {
          livreur_id: body.livreurId,
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

      //Création de la livraison
      await Livraison.create({
        statutLivraison_id: 1,
        demandeLivraison_id: demande.demandeLivraison_id,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      //Mise à jour du statut de la disponibilité du livreur
      let dispoLivreur = await Disponibilite.findOne({
        where: {
          liv_id: demande.livreur_id
        }
      });
      await dispoLivreur.update({
        statut: 0
      });

      //Livraison
      const livraison = await Livraison.findOne({
        where: {
          demandeLivraison_id: demande.demandeLivraison_id,
        },
        include: [{
          model: StatutLivraison,
          required: true,
          as: "statutLivraison"
        }]
      });
      demande = JSON.stringify(demande);
      demande = JSON.parse(demande);
      demande.livraison = JSON.parse(JSON.stringify(livraison));

      return res.json({
        success: true,
        message: `Demande ${demande.statutDemandeLivraison.libelle} et livraison crée`,
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
