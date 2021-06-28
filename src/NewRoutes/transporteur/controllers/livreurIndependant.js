import {
  sign
} from '../../../services/jwt';
import bcrypt from 'bcryptjs';
import db from "../../../NewModels";
import {
  Op
} from "sequelize";

import {
  GENERATEID
} from "../../../helpers/idGenerator";


export default async ({
  bodymen: {
    body
  }
}, res, next) => {
  try {

    const Personne = db.personne;
    const PersonnePhysique = db.personnephysique;
    const Utilisateur = db.utilisateur;
    const Vehicule = db.vehicule;
    const Transporteur = db.transporteur;

    const personneId = GENERATEID();

    const emailTelExist = await Personne.findOne({
      where: {
        [Op.or]: [{
            telephone: body.telephone
          },
          {
            email: body.email
          }
        ]
      }
    });

    if (emailTelExist) {
      return res.json({
        success: false,
        message: "Email et/ou téléphone déjà utilisé(s)",
        token: null,
        userId: null
      });
    } else {
      const personne = await Personne.create({
        personneId: personneId,
        nomCourant: body.nom + " " + body.prenoms,
        telephone: body.telephone,
        email: body.email
      });

      const personnePhysique = await PersonnePhysique.create({
        personneId: personneId,
        nom: body.nom,
        prenoms: body.prenoms,
        dateNaissance: body.dateNaissance,
        adresse: body.adresse,
      });

      const utilisateur = await Utilisateur.create({
        userId: GENERATEID(),
        personneId: personneId,
        userType: "TRIN",
        userTypeLibelle: "Transporteur indépendant",
        login: body.email,
        password: bcrypt.hashSync(body.password, 8),
      });

      /** Création du véhicule et transporteur **/
      const vehicule = await Vehicule.create({
        vehiculeTypeId: body.typeVehicule,
        marque: body.marqueVehicule,
        matricule: body.matriculeVehicule,
        numeroAssurVeh: body.assuranceVehicule,
        numeroAssurMar: body.assuranceMarch
      });

      const transporteur = await Transporteur.create({
        personneId: personneId,
        vehiculeId: vehicule.vehiculeId,
      });
      /** Fin **/

      const token = await sign(utilisateur.userId);

      let userRes = JSON.parse(JSON.stringify(utilisateur));
      let personneRes = JSON.parse(JSON.stringify(personne));
      let vehiculeRes = JSON.parse(JSON.stringify(vehicule));
      let transporteurRes = JSON.parse(JSON.stringify(transporteur));
      transporteurRes.vehicule = vehiculeRes;
      personneRes.personnephysique = JSON.parse(JSON.stringify(personnePhysique));
      personneRes.personnephysique.transporteur = transporteurRes;
      personneRes.personnemorale = null;
      userRes.personne = personneRes;

      return res.json({
        success: true,
        message: "Opération réussie",
        token: token,
        user: userRes
      });
    }

  } catch (err) {
    next(err);

    return res.json({
      success: false,
      message: err,
      token: null,
      userId: null
    });
  }
}
