import {
  Sequelize
} from "sequelize";
import {
  database
} from '../config';
import initModels from "./init-models";

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
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const dbModels = initModels(sequelize);

db.cartepaiment = dbModels.cartepaiment;
db.commande = dbModels.commande;
db.demandelivraison = dbModels.demandelivraison;
db.destination = dbModels.destination;
db.disponibilite = dbModels.disponibilite;
db.document = dbModels.document;
db.encaissement = dbModels.encaissement;
db.enlevement = dbModels.enlevement;
db.livraison = dbModels.livraison;
db.modeencaissement = dbModels.modeencaissement;
db.motifannulationlivraison = dbModels.motifannulationlivraison;
db.naturecolis = dbModels.naturecolis;
db.personne = dbModels.personne;
db.personnemorale = dbModels.personnemorale;
db.personnephysique = dbModels.personnephysique;
db.piecevehicule = dbModels.piecevehicule;
db.plagepoids = dbModels.plagepoids;
db.pmsecteuractivite = dbModels.pmsecteuractivite;
db.secteuractivite = dbModels.secteuractivite;
db.statutdemande = dbModels.statutdemande;
db.statutencaissement = dbModels.statutencaissement;
db.statutlivraison = dbModels.statutlivraison;
db.transporteur = dbModels.transporteur;
db.utilisateur = dbModels.utilisateur;
db.vehicule = dbModels.vehicule;
db.vehiculetype = dbModels.vehiculetype;


module.exports = db;
