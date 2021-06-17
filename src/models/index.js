import {
  database
} from '../config'
import Sequelize from 'sequelize'
import user from './user'
import commande from './commande'
import livreur from './livreur'
import disponibilite from './disponibilite'
import statutCommande from './statutCommande'
import statutDemandeLivraison from './statutDemandeLivraison'
import demandeLivraison from './demandeLivraison'
import statutLivraison from './statutLivraison'
import livraison from './livraison'



const sequelize = new Sequelize(database.DB, database.USER, database.PASSWORD, {
  host: database.HOST,
  dialect: database.dialect,
  operatorsAliases: false,

  pool: {
    max: database.pool.max,
    min: database.pool.min,
    acquire: database.pool.acquire,
    idle: database.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = user(sequelize, Sequelize);
db.commande = commande(sequelize, Sequelize);
db.livreur = livreur(sequelize, Sequelize);
db.disponibilite = disponibilite(sequelize, Sequelize);
db.statutCommande = statutCommande(sequelize, Sequelize);
db.statutDemandeLivraison = statutDemandeLivraison(sequelize, Sequelize);
db.demandeLivraison = demandeLivraison(sequelize, Sequelize);
db.statutLivraison = statutLivraison(sequelize, Sequelize);
db.livraison = livraison(sequelize, Sequelize);

// relation des tables

db.disponibilite.belongsTo(db.livreur, {
  foreignKey: 'liv_id',
  as: 'livreur'
})
db.commande.belongsTo(db.user, {
  foreignKey: 'user_id',
  as: 'user'
})

db.commande.belongsTo(db.statutCommande, {
  foreignKey: 'statutCommande_id',
  as: 'statutCommande'
})

/** Demande de livarison */
db.demandeLivraison.belongsTo(db.statutDemandeLivraison, {
  foreignKey: 'statutDemandeLivraison_id',
  as: 'statutDemandeLivraison'
})

db.demandeLivraison.belongsTo(db.commande, {
  foreignKey: 'commande_id',
  as: 'commande'
})

db.demandeLivraison.belongsTo(db.livreur, {
  foreignKey: 'livreur_id',
  as: 'livreur'
})
/** Fin */

/** Livraison */
db.livraison.belongsTo(db.statutLivraison, {
  foreignKey: 'statutLivraison_id',
  as: 'statutLivraison'
})

db.livraison.belongsTo(db.demandeLivraison, {
  foreignKey: 'demandeLivraison_id',
  as: 'demandeLivraison'
})
/** Fin */


module.exports = db;
