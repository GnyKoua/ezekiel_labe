import db from '../../../NewModels';
import {
  sign
} from '../../../services/jwt';
import {
  HttpError
} from '../../../services/error';
import bcrypt from 'bcryptjs';

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

    const user = await Utilisateur.findOne({
      where: {
        login: body.email,
        [Op.or]: [{
          userType: "CLPA"
        },
        {
          userType: "CLEN"
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
        }, {
          model: PersonneMorale,
          required: false,
          as: "personnemorale",
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
