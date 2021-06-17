import db from '../../../models'
import { sign } from '../../../services/jwt'
import { HttpError } from '../../../services/error'
import bcrypt from 'bcryptjs'

export default async ({ bodymen: { body } }, res, next) => {
    try {
        const User = db.user

        const user = await User.findOne({ where: { email: body.email } })

        if(!user) {
           return res.sendUserError('Utilisateur introuvable')
        }

        const checkPassword = bcrypt.compareSync(body.password, user.password)

        if(!checkPassword) {
            return res.sendUserError('Adresse email ou mot de passe incorrecte')
        }

        const token = await sign(user.id)

       return res.json({
            success: true,
            token
        })

    } catch (err) {
        return next(err)
    }
}













