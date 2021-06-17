import db from '../../../models'
import { sign } from '../../../services/jwt'
import bcrypt from 'bcryptjs'


export default async ({ bodymen: { body } }, res, next) => {
    try {
        const Livreur = db.livreur

        const livreur = await Livreur.create({
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
                livreurType: 'Livreur Independant',

            })

         const token = await sign(livreur.liv_id)
        //body.nom
        return res.json({
            success: true,
            users: body,
            token,
            id: livreur.liv_id
        })

    } catch (err) {
        return next(err)
    }
}
