import db from '../../../models'
import { sign } from '../../../services/jwt'
import { HttpError } from '../../../services/error'
import bcrypt from 'bcryptjs'

export default async ({ bodymen: { body } }, res, next) => {
    try {
        const Livreur = db.livreur

        const user = await Livreur.findOne({ where: { email: body.email } })

        if(!user) {
           return res.sendUserError('Utilisateur introuvable')
        }

        const checkPassword = bcrypt.compareSync(body.password, user.password)

        if(!checkPassword) {
            return res.sendUserError('Adresse email ou mot de passe incorrecte')
        }

        const token = await sign(user.liv_id)

       return res.json({
            success: true,
            token,
            user
        })

    } catch (err) {
        return next(err)
    }
}












