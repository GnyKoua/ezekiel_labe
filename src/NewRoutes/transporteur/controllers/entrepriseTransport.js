import {
  sign
} from '../../../services/jwt';
import bcrypt from 'bcryptjs';
import db from "../../../NewModels";

import {
  GENERATEID
} from "../../../helpers/idGenerator";
import {
  Op
} from 'sequelize';


export default async ({
  bodymen: {
    body
  }
}, res, next) => {
  try {
    const Personne = db.personne;
    const PersonneMorale = db.personnemorale;
    const Utilisateur = db.utilisateur;
    const PMsecteurActivite = db.pmsecteuractivite;

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
        nomCourant: body.denomination,
        telephone: body.telephone,
        email: body.email,
        emailSecondaire: body.emailSecondaire,
      });

      const personneMorale = await PersonneMorale.create({
        personneId: personneId,
        statutEntreprise: body.statutEntreprise,
        denomination: body.denomination,
        siret: body.siret,
        tva: body.tva,
        nomRepresentant: body.nomRepresentant,
        adresseSociale: body.adresseSociale,
        adresseEtab: body.adresseEtab,
        adresseFacturation: body.adresseFacturation,
        personneContact: body.personneContact
      });

      const secteurs = body.secteurs.split(";");
      secteurs.forEach(async (sec) => {
        await PMsecteurActivite.create({
          personneId: personneId,
          secteurActiviteId: sec
        });
      });

      const utilisateur = await Utilisateur.create({
        userId: GENERATEID(),
        personneId: personneId,
        userType: "ENTR",
        userTypeLibelle: "Entreprise de transport",
        login: body.email,
        password: bcrypt.hashSync(body.password, 8)
      });

      const token = await sign(utilisateur.userId);

      let userRes = JSON.parse(JSON.stringify(utilisateur));
      let personneRes = JSON.parse(JSON.stringify(personne));
      personneRes.personnephysique = null;
      personneRes.personnemorale = JSON.parse(JSON.stringify(personneMorale));
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
