import db from "../../../models";
import NodeGeocoder from "node-geocoder";
import distance from "gps-distance";
import {
  col,
  fn
} from "sequelize";


//Recherche de livreur pour une commande {commande_id}
export default async ({
  bodymen: {
    body
  }
}, res, next) => {
  try {
    const options = {
      provider: "google",
      // Optional depending on the providers
      // fetch: customFetchImplementation,
      apiKey: "AIzaSyBzinZJh9TiAuZW5tBKYSUffrXRkj71-wQ", // for Mapquest, OpenCage, Google Premier
      formatter: null, // 'gpx', 'string', ...
    };
    const Disponibilite = db.disponibilite;
    const Commande = db.commande;
    const CtatutCommande = db.statutCommande;
    const DemandeLivraison = db.demandeLivraison;

    const isAlreadyTreated = await Commande.findOne({
      where: {
        commande_id: body.commandeId,
        statutCommande_id: 3
      },
      include: [{
        model: CtatutCommande,
        required: true,
        as: "statutCommande"
      }]
    });

    if (isAlreadyTreated) {
      return res.status(500).json({
        success: false,
        message: `Commande est déjà *${isAlreadyTreated.statutCommande.libelle}*`,
        demandeId: null
      });
    } else {
      const liv_dispo = await Disponibilite.findAll({
        where: {
          statut: 1,
        },
      });

      //Nombre de rejet par livreur pour cette commande
      var demmandeRejeteesByLivreur = [];
      demmandeRejeteesByLivreur = await DemandeLivraison.findAll({
        where: {
          commande_id: body.commandeId,
          statutDemandeLivraison_id: 3
        },
        group: ['livreur_id'],
        attributes: ['livreur_id', [fn('count', col('livreur_id')), 'NombreRejet']]
      });

      //Livreurs dispo
      if (liv_dispo) {
        var commande = await Commande.findOne({
          where: {
            commande_id: body.commandeId
          }
        });
        var comm = JSON.stringify(commande);
        var objetComande = JSON.parse(comm);

        var distancePD = [];

        const geocoder = NodeGeocoder(options);
        // Using callback
        const rest = await geocoder.geocode(objetComande.adresseDepart);

        var liv = JSON.stringify(liv_dispo);
        var liv2 = JSON.parse(liv);

        for (let j = 0; j < liv2.length; j++) {

          const elmt = liv2[j];

          var result = distance(elmt.latitude, elmt.longitude, rest[0].latitude, rest[0].longitude);

          var data = {
            "LivreurId": elmt.liv_id,
            "Distance": result,
            "Commande": objetComande
          };

          var dat = JSON.stringify(data);
          var dat2 = JSON.parse(dat);
          distancePD.push(dat2);
        }

        //Ordonner la liste de la plus petite à la plus grande distance
        distancePD = distancePD.sort((a, b) => (a.Distance < b.Distance) ? -1 : a.Distance > b.Distance ? 1 : 0);


        //Ordonner par nombre de rejet de cette commande
        let demmandeRejeteesByLivreurString = JSON.stringify(demmandeRejeteesByLivreur);
        demmandeRejeteesByLivreur = JSON.parse(demmandeRejeteesByLivreurString);
        distancePD.forEach(dis => {
          let res = demmandeRejeteesByLivreur.find(elem => elem.livreur_id == dis.LivreurId);
          dis.NombreRejet = (res != undefined) ? res.NombreRejet : 0;
        });
        
        distancePD = distancePD.sort((a, b) => (a.NombreRejet < b.NombreRejet) ? -1 : a.NombreRejet > b.NombreRejet ? 1 : 0);

        res.json(distancePD);

        next();
      }
    }

  } catch (err) {
    return next(err);
  }
}
