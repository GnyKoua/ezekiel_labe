import db from '../../../NewModels';
import {
  sign
} from '../../../services/jwt';
import {
  HttpError
} from '../../../services/error';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

export default async ({
  bodymen: {
    body
  }
}, res, next) => {
  try {
    const Utilisateur = db.utilisateur;
    const Personne = db.personne;
    const PersonnePhysique = db.personnephysique;
    const PersonneMorale = db.personnemorale;
    const Vehicule = db.vehicule;
    const Transporteur = db.transporteur;

    const user = await Utilisateur.findOne({
      where: {
        login: body.email,
        [Op.or]: [{
          userType: "TRIN"
        },
        {
          userType: "TRDE"
        },
        {
          userType: "ENTR"
        }
      ]
      },
      include: [{
        model: Personne,
        required: true,
        as: "personne",
        include: [{
          model: PersonnePhysique,
          required: false,
          as: "personnephysique",
          include: [{
            model: Transporteur,
            required: false,
            as: "transporteur",
            include: [{
              model: Vehicule,
              required: false,
              as: "vehicule"
            }, {
              model: PersonneMorale,
              required: false,
              as: "entreprise"
            }]
          }]
        }, {
          model: PersonneMorale,
          required: false,
          as: "personnemorale",
          include: [{
            model: Transporteur,
            required: false,
            as: "transporteurs",
            include: [{
              model: Vehicule,
              required: false,
              as: "vehicule"
            }]
          }]
        }]
      }]
    });

    if (!user) {
      return res.sendUserError('Utilisateur introuvable')
    }

    const checkPassword = bcrypt.compareSync(body.password, user.password)

    if (!checkPassword) {
      return res.sendUserError('Adresse email ou mot de passe incorrecte')
    }

    const token = await sign(user.userId);

    return res.json({
      success: true,
      token: token,
      user: user
    });

  } catch (err) {
    return next(err)
  }
}
