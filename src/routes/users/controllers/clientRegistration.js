import db from '../../../models'
import { sign } from '../../../services/jwt/'
import bcrypt from 'bcryptjs'


export default async ({ bodymen: { body } }, res, next) => {
    try {
        const User = db.user

        const user = await User.create({
                nom: body.nom,
                prenom: body.prenom,
                email: body.email,
                password:bcrypt.hashSync(body.password, 8),
                numero:body.numero,
                adresse:body.adresse,
                userType: 'particulier'
            })

         const token = await sign(user.id)
        //body.nom
        return res.json({
            success: true,
            users: body,
            token,
            id: user.id
        })

    } catch (err) {
        return next(err)
    }
}

