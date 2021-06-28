import db from "../../../models";
//import { sign } from '../../../services/jwt'
//import bcrypt from 'bcryptjs'
import NodeGeocoder from "node-geocoder";
import distance from "gps-distance";

const sequelize = require("sequelize");

const options = {
  provider: "google",
  // Optional depending on the providers
  // fetch: customFetchImplementation,
  apiKey: "AIzaSyBzinZJh9TiAuZW5tBKYSUffrXRkj71-wQ", // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

async function getCommande() {
  try {
    const Commande = db.commande;

    const liv = await Commande.findAll({
      where: {
        statut: 1,
      }
    });
    // console.log(liv.every(data => data instanceof Commande)); // true
    //  console.log("All data:", JSON.stringify(liv, null, 2));

    //return JSON.parse(liv)
    return liv;
  } catch (err) {
    return err;
  }
}


//module.exports.getdispo
module.exports.getDispo = async (req, res, next) => {
  try {
    const Disponibilite = db.disponibilite;

    const liv_dispo = await Disponibilite.findAll({
      where: {
        statut: 1,
      },
    });


    // console.log(liv_dispo.every(data => data instanceof Disponibilite)); // true
    //console.log("All data:", JSON.ccd(liv_dispo, null, 2));

    if (liv_dispo) {
      var commande = await getCommande();
      var comm = JSON.stringify(commande);
      //var comm = JSON.parse(commande)
      //console.log(comm)
      var comm2 = JSON.parse(comm);
      //console.log(comm2)

      ///   console.log(comm2);

      // console.log(comm2[0].adresseDepart)

      var distancePD = [];

      for (let i = 0; i < comm2.length; i++) {
        const element = comm2[i];
        const geocoder = NodeGeocoder(options);
        // Using callback
        const rest = await geocoder.geocode(element.adresseDepart);
        ///console.log(rest)

        var liv = JSON.stringify(liv_dispo);
        var liv2 = JSON.parse(liv);

        //console.log(liv2)

        for (let j = 0; j < liv2.length; j++) {
          //console.log(liv_dispo)

          const elmt = liv2[j];

          ///  console.log(elmt);

          var result = distance(elmt.latitude, elmt.longitude, rest[0].latitude, rest[0].longitude);
          // console.log(result);

          var data = {
            "LivreurId": elmt.liv_id,
            "Distance": result,
            "Commande": element
          };

          /// console.log(data);
          var dat = JSON.stringify(data);
          var dat2 = JSON.parse(dat);
          //console.log(dat2)
          distancePD.push(dat2);
          //console.log(distancePD)
        }
      }

      //Ordonner la liste de la plus petite à la plus grande distance
      distancePD = distancePD.sort((a, b) => (a.Distance < b.Distance) ? -1 : a.Distance > b.Distance ? 1 : 0);
      console.log(distancePD);

      let regroupByCommande = distancePD.reduce((objBack, obj) => {
        (objBack[obj.Commande.commande_id]) ? objBack[obj.Commande.commande_id].push(obj): objBack[obj.Commande.commande_id] = [obj];

        return objBack;
      }, {});

      req.data = regroupByCommande;

      res.json(regroupByCommande);

      next();
    }
  } catch (err) {
    return next(err);
  }
}