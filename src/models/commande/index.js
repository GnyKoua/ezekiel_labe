export default (sequelize, Sequelize) =>{
    const Commande = sequelize.define('commande', {

        commande_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement:true,
            primaryKey:true,

        },
        adresseDepart: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        adresseArrivee: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        natureArticle: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        nombreChariot: {
            type: Sequelize.INTEGER(200),
            allowNull: true,
        },

        TotalColis: {
            type: Sequelize.INTEGER(200),
            allowNull: true,
        },
        PoidsTotalColis: {
            type: Sequelize.INTEGER(200),
            allowNull: true,
        },
        commentaire: {
            type: Sequelize.STRING(200),
            allowNull: true,
        }
    })
return Commande
}
