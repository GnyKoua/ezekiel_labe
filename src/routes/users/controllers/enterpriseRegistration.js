import db from '../../../models'
import { sign } from '../../../services/jwt'
import bcrypt from 'bcryptjs'


export default async ({ bodymen: { body } }, res, next) => {
    try {
        const User = db.user

        const user = await User.create({
                email: body.email,
                password:bcrypt.hashSync(body.password, 8),
                numero:body.numero,
                adresse:body.adresse,
                denomination:body.denomination,
                activite:body.activite,
                status:body.status,
                siret:body.siret,
                vehicule:body.vehicule,
                representant:body.representant,
                assurance: body.assurance,
                adresseFacturation: body.adresseFacturation,
                userType: 'entreprise'
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










{/*


export default async ({ bodymen: { body } }, res, next) => {
    try {
        const User = db.user

        const res = await User.create({

        })

        //body.nom
        return res.json({
            success: true,
            users: body
        })

    } catch (err) {
        return next(err)
    }
}
*/}
