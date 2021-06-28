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
        userType: "CLPA",
        userTypeLibelle: "Client particulier",
        login: body.email,
        password: bcrypt.hashSync(body.password, 8),
      });

      const token = await sign(utilisateur.userId);

      let userRes = JSON.parse(JSON.stringify(utilisateur));
      let personneRes = JSON.parse(JSON.stringify(personne));
      personneRes.personnephysique = JSON.parse(JSON.stringify(personnePhysique));
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
