import { Sequelize } from 'sequelize';
import {
  database
} from '../config';
import cartepaiment from "./cartepaiment";
import commande from "./commande";
import demandelivraison from "./demandelivraison";
import destination from "./destination";
import disponibilite from "./disponibilite";
import document from "./document";
import encaissement from "./encaissement";
import enlevement from "./enlevement";
import livraison from "./livraison";
import modeencaissement from "./modeencaissement";
import motifannulationlivraison from "./motifannulationlivraison";
import naturecolis from "./naturecolis";
import personne from "./personne";
import personnemorale from "./personnemorale";
import personnephysique from "./personnephysique";
import piecevehicule from "./piecevehicule";
import plagepoids from "./plagepoids";
import pmsecteuractivite from "./pmsecteuractivite";
import secteuractivite from "./secteuractivite";
import statutdemande from "./statutdemande";
import statutencaissement from "./statutencaissement";
import statutlivraison from "./statutlivraison";
import transporteur from "./transporteur";
import utilisateur from "./utilisateur";
import vehicule from "./vehicule";
import vehiculetype from "./vehiculetype";

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

const dbModels = {};

dbModels.Sequelize = Sequelize;
dbModels.sequelize = sequelize;

dbModels.cartepaiment = cartepaiment(sequelize, Sequelize);
dbModels.commande = commande(sequelize, Sequelize);
dbModels.demandelivraison = demandelivraison(sequelize, Sequelize);
dbModels.destination = destination(sequelize, Sequelize);
dbModels.disponibilite = disponibilite(sequelize, Sequelize);
dbModels.document = document(sequelize, Sequelize);
dbModels.encaissement = encaissement(sequelize, Sequelize);
dbModels.enlevement = enlevement(sequelize, Sequelize);
dbModels.livraison = livraison(sequelize, Sequelize);
dbModels.modeencaissement = modeencaissement(sequelize, Sequelize);
dbModels.motifannulationlivraison = motifannulationlivraison(sequelize, Sequelize);
dbModels.naturecolis = naturecolis(sequelize, Sequelize);
dbModels.personne = personne(sequelize, Sequelize);
dbModels.personnemorale = personnemorale(sequelize, Sequelize);
dbModels.personnephysique = personnephysique(sequelize, Sequelize);
dbModels.piecevehicule = piecevehicule(sequelize, Sequelize);
dbModels.plagepoids = plagepoids(sequelize, Sequelize);
dbModels.pmsecteuractivite = pmsecteuractivite(sequelize, Sequelize);
dbModels.secteuractivite = secteuractivite(sequelize, Sequelize);
dbModels.statutdemande = statutdemande(sequelize, Sequelize);
dbModels.statutencaissement = statutencaissement(sequelize, Sequelize);
dbModels.statutlivraison = statutlivraison(sequelize, Sequelize);
dbModels.transporteur = transporteur(sequelize, Sequelize);
dbModels.utilisateur = utilisateur(sequelize, Sequelize);
dbModels.vehicule = vehicule(sequelize, Sequelize);
dbModels.vehiculetype = vehiculetype(sequelize, Sequelize);

dbModels.personnemorale.belongsToMany(dbModels.secteuractivite, {
  as: 'secteurActiviteIdsecteuractivites',
  through: pmsecteuractivite,
  foreignKey: "personneId",
  otherKey: "secteurActiviteId"
});
dbModels.secteuractivite.belongsToMany(dbModels.personnemorale, {
  as: 'personneIdpersonnemorales',
  through: pmsecteuractivite,
  foreignKey: "secteurActiviteId",
  otherKey: "personneId"
});
dbModels.encaissement.belongsTo(dbModels.cartepaiment, {
  as: "carte",
  foreignKey: "carteId"
});
dbModels.cartepaiment.hasMany(dbModels.encaissement, {
  as: "encaissements",
  foreignKey: "carteId"
});
dbModels.demandelivraison.belongsTo(dbModels.commande, {
  as: "commande",
  foreignKey: "commandeId"
});
dbModels.commande.hasMany(dbModels.demandelivraison, {
  as: "demandelivraisons",
  foreignKey: "commandeId"
});
dbModels.destination.belongsTo(dbModels.commande, {
  as: "commande",
  foreignKey: "commandeId"
});
dbModels.commande.hasOne(dbModels.destination, {
  as: "destination",
  foreignKey: "commandeId"
});
dbModels.enlevement.belongsTo(dbModels.commande, {
  as: "commande",
  foreignKey: "commandeId"
});
dbModels.commande.hasOne(dbModels.enlevement, {
  as: "enlevement",
  foreignKey: "commandeId"
});
dbModels.livraison.belongsTo(dbModels.demandelivraison, {
  as: "demande",
  foreignKey: "demandeId"
});
dbModels.demandelivraison.hasOne(dbModels.livraison, {
  as: "livraison",
  foreignKey: "demandeId"
});
dbModels.statutdemande.belongsTo(dbModels.demandelivraison, {
  as: "demande",
  foreignKey: "demandeId"
});
dbModels.demandelivraison.hasMany(dbModels.statutdemande, {
  as: "statutdemandes",
  foreignKey: "demandeId"
});
dbModels.commande.belongsTo(dbModels.encaissement, {
  as: "encaissement",
  foreignKey: "encaissementId"
});
dbModels.encaissement.hasOne(dbModels.commande, {
  as: "commande",
  foreignKey: "encaissementId"
});
dbModels.statutencaissement.belongsTo(dbModels.encaissement, {
  as: "encaissement",
  foreignKey: "encaissementId"
});
dbModels.encaissement.hasMany(dbModels.statutencaissement, {
  as: "statutencaissements",
  foreignKey: "encaissementId"
});
dbModels.statutlivraison.belongsTo(dbModels.livraison, {
  as: "livraison",
  foreignKey: "livraisonId"
});
dbModels.livraison.hasMany(dbModels.statutlivraison, {
  as: "statutlivraisons",
  foreignKey: "livraisonId"
});
dbModels.encaissement.belongsTo(dbModels.modeencaissement, {
  as: "mode",
  foreignKey: "modeId"
});
dbModels.modeencaissement.hasMany(dbModels.encaissement, {
  as: "encaissements",
  foreignKey: "modeId"
});
dbModels.statutdemande.belongsTo(dbModels.motifannulationlivraison, {
  as: "motifAnnulation",
  foreignKey: "motifAnnulationId"
});
dbModels.motifannulationlivraison.hasMany(dbModels.statutdemande, {
  as: "statutdemandes",
  foreignKey: "motifAnnulationId"
});
dbModels.commande.belongsTo(dbModels.naturecolis, {
  as: "natureColi",
  foreignKey: "natureColisId"
});
dbModels.naturecolis.hasMany(dbModels.commande, {
  as: "commandes",
  foreignKey: "natureColisId"
});
dbModels.cartepaiment.belongsTo(dbModels.personne, {
  as: "personne",
  foreignKey: "personneId"
});
dbModels.personne.hasMany(dbModels.cartepaiment, {
  as: "cartepaiments",
  foreignKey: "personneId"
});
dbModels.document.belongsTo(dbModels.personne, {
  as: "personne",
  foreignKey: "personneId"
});
dbModels.personne.hasMany(dbModels.document, {
  as: "documents",
  foreignKey: "personneId"
});
dbModels.personnemorale.belongsTo(dbModels.personne, {
  as: "personne",
  foreignKey: "personneId"
});
dbModels.personne.hasOne(dbModels.personnemorale, {
  as: "personnemorale",
  foreignKey: "personneId"
});
dbModels.personnephysique.belongsTo(dbModels.personne, {
  as: "personne",
  foreignKey: "personneId"
});
dbModels.personne.hasOne(dbModels.personnephysique, {
  as: "personnephysique",
  foreignKey: "personneId"
});
dbModels.utilisateur.belongsTo(dbModels.personne, {
  as: "personne",
  foreignKey: "personneId"
});
dbModels.personne.hasMany(dbModels.utilisateur, {
  as: "utilisateurs",
  foreignKey: "personneId"
});
dbModels.pmsecteuractivite.belongsTo(dbModels.personnemorale, {
  as: "personne",
  foreignKey: "personneId"
});
dbModels.personnemorale.hasMany(dbModels.pmsecteuractivite, {
  as: "pmsecteuractivites",
  foreignKey: "personneId"
});
dbModels.transporteur.belongsTo(dbModels.personnemorale, {
  as: "entreprise",
  foreignKey: "entrepriseId"
});
dbModels.personnemorale.hasMany(dbModels.transporteur, {
  as: "transporteurs",
  foreignKey: "entrepriseId"
});
dbModels.transporteur.belongsTo(dbModels.personnephysique, {
  as: "personne",
  foreignKey: "personneId"
});
dbModels.personnephysique.hasOne(dbModels.transporteur, {
  as: "transporteur",
  foreignKey: "personneId"
});
dbModels.commande.belongsTo(dbModels.plagepoids, {
  as: "plagePoid",
  foreignKey: "plagePoidsId"
});
dbModels.plagepoids.hasMany(dbModels.commande, {
  as: "commandes",
  foreignKey: "plagePoidsId"
});
dbModels.vehiculetype.belongsTo(dbModels.plagepoids, {
  as: "plagePoid",
  foreignKey: "plagePoidsId"
});
dbModels.plagepoids.hasMany(dbModels.vehiculetype, {
  as: "vehiculetypes",
  foreignKey: "plagePoidsId"
});
dbModels.pmsecteuractivite.belongsTo(dbModels.secteuractivite, {
  as: "secteurActivite",
  foreignKey: "secteurActiviteId"
});
dbModels.secteuractivite.hasMany(dbModels.pmsecteuractivite, {
  as: "pmsecteuractivites",
  foreignKey: "secteurActiviteId"
});
dbModels.disponibilite.belongsTo(dbModels.transporteur, {
  as: "transporteur",
  foreignKey: "transporteurId"
});
dbModels.transporteur.hasMany(dbModels.disponibilite, {
  as: "disponibilites",
  foreignKey: "transporteurId"
});
dbModels.commande.belongsTo(dbModels.utilisateur, {
  as: "user",
  foreignKey: "userId"
});
dbModels.utilisateur.hasMany(dbModels.commande, {
  as: "commandes",
  foreignKey: "userId"
});
dbModels.piecevehicule.belongsTo(dbModels.vehicule, {
  as: "vehicule",
  foreignKey: "vehiculeId"
});
dbModels.vehicule.hasMany(dbModels.piecevehicule, {
  as: "piecevehicules",
  foreignKey: "vehiculeId"
});
dbModels.transporteur.belongsTo(dbModels.vehicule, {
  as: "vehicule",
  foreignKey: "vehiculeId"
});
dbModels.vehicule.hasMany(dbModels.transporteur, {
  as: "transporteurs",
  foreignKey: "vehiculeId"
});
dbModels.vehicule.belongsTo(dbModels.vehiculetype, {
  as: "vehiculeType",
  foreignKey: "vehiculeTypeId"
});
dbModels.vehiculetype.hasMany(dbModels.vehicule, {
  as: "vehicules",
  foreignKey: "vehiculeTypeId"
});


module.exports = dbModels;
