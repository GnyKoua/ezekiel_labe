import {
  Sequelize
} from "sequelize";
import _cartepaiment from "./cartepaiment";
import _commande from "./commande";
import _demandelivraison from "./demandelivraison";
import _destination from "./destination";
import _disponibilite from "./disponibilite";
import _document from "./document";
import _encaissement from "./encaissement";
import _enlevement from "./enlevement";
import _livraison from "./livraison";
import _modeencaissement from "./modeencaissement";
import _motifannulationlivraison from "./motifannulationlivraison";
import _naturecolis from "./naturecolis";
import _personne from "./personne";
import _personnemorale from "./personnemorale";
import _personnephysique from "./personnephysique";
import _piecevehicule from "./piecevehicule";
import _plagepoids from "./plagepoids";
import _pmsecteuractivite from "./pmsecteuractivite";
import _secteuractivite from "./secteuractivite";
import _statutdemande from "./statutdemande";
import _statutencaissement from "./statutencaissement";
import _statutlivraison from "./statutlivraison";
import _transporteur from "./transporteur";
import _utilisateur from "./utilisateur";
import _vehicule from "./vehicule";
import _vehiculetype from "./vehiculetype";

function initModels(sequelize) {
  var cartepaiment = _cartepaiment(sequelize, Sequelize);
  var commande = _commande(sequelize, Sequelize);
  var demandelivraison = _demandelivraison(sequelize, Sequelize);
  var destination = _destination(sequelize, Sequelize);
  var disponibilite = _disponibilite(sequelize, Sequelize);
  var document = _document(sequelize, Sequelize);
  var encaissement = _encaissement(sequelize, Sequelize);
  var enlevement = _enlevement(sequelize, Sequelize);
  var livraison = _livraison(sequelize, Sequelize);
  var modeencaissement = _modeencaissement(sequelize, Sequelize);
  var motifannulationlivraison = _motifannulationlivraison(sequelize, Sequelize);
  var naturecolis = _naturecolis(sequelize, Sequelize);
  var personne = _personne(sequelize, Sequelize);
  var personnemorale = _personnemorale(sequelize, Sequelize);
  var personnephysique = _personnephysique(sequelize, Sequelize);
  var piecevehicule = _piecevehicule(sequelize, Sequelize);
  var plagepoids = _plagepoids(sequelize, Sequelize);
  var pmsecteuractivite = _pmsecteuractivite(sequelize, Sequelize);
  var secteuractivite = _secteuractivite(sequelize, Sequelize);
  var statutdemande = _statutdemande(sequelize, Sequelize);
  var statutencaissement = _statutencaissement(sequelize, Sequelize);
  var statutlivraison = _statutlivraison(sequelize, Sequelize);
  var transporteur = _transporteur(sequelize, Sequelize);
  var utilisateur = _utilisateur(sequelize, Sequelize);
  var vehicule = _vehicule(sequelize, Sequelize);
  var vehiculetype = _vehiculetype(sequelize, Sequelize);

  personnemorale.belongsToMany(secteuractivite, {
    as: 'secteurActiviteId_secteuractivites',
    through: pmsecteuractivite,
    foreignKey: "personneId",
    otherKey: "secteurActiviteId"
  });
  secteuractivite.belongsToMany(personnemorale, {
    as: 'personneId_personnemorales',
    through: pmsecteuractivite,
    foreignKey: "secteurActiviteId",
    otherKey: "personneId"
  });
  encaissement.belongsTo(cartepaiment, {
    as: "carte",
    foreignKey: "carteId"
  });
  cartepaiment.hasMany(encaissement, {
    as: "encaissements",
    foreignKey: "carteId"
  });
  demandelivraison.belongsTo(commande, {
    as: "commande",
    foreignKey: "commandeId"
  });
  commande.hasMany(demandelivraison, {
    as: "demandelivraisons",
    foreignKey: "commandeId"
  });
  destination.belongsTo(commande, {
    as: "commande",
    foreignKey: "commandeId"
  });
  commande.hasOne(destination, {
    as: "destination",
    foreignKey: "commandeId"
  });
  enlevement.belongsTo(commande, {
    as: "commande",
    foreignKey: "commandeId"
  });
  commande.hasOne(enlevement, {
    as: "enlevement",
    foreignKey: "commandeId"
  });
  livraison.belongsTo(demandelivraison, {
    as: "demande",
    foreignKey: "demandeId"
  });
  demandelivraison.hasOne(livraison, {
    as: "livraison",
    foreignKey: "demandeId"
  });
  statutdemande.belongsTo(demandelivraison, {
    as: "demande",
    foreignKey: "demandeId"
  });
  demandelivraison.hasMany(statutdemande, {
    as: "statutdemandes",
    foreignKey: "demandeId"
  });
  commande.belongsTo(encaissement, {
    as: "encaissement",
    foreignKey: "encaissementId"
  });
  encaissement.hasOne(commande, {
    as: "commande",
    foreignKey: "encaissementId"
  });
  statutencaissement.belongsTo(encaissement, {
    as: "encaissement",
    foreignKey: "encaissementId"
  });
  encaissement.hasMany(statutencaissement, {
    as: "statutencaissements",
    foreignKey: "encaissementId"
  });
  statutlivraison.belongsTo(livraison, {
    as: "livraison",
    foreignKey: "livraisonId"
  });
  livraison.hasMany(statutlivraison, {
    as: "statutlivraisons",
    foreignKey: "livraisonId"
  });
  encaissement.belongsTo(modeencaissement, {
    as: "mode",
    foreignKey: "modeId"
  });
  modeencaissement.hasMany(encaissement, {
    as: "encaissements",
    foreignKey: "modeId"
  });
  statutdemande.belongsTo(motifannulationlivraison, {
    as: "motifAnnulation",
    foreignKey: "motifAnnulationId"
  });
  motifannulationlivraison.hasMany(statutdemande, {
    as: "statutdemandes",
    foreignKey: "motifAnnulationId"
  });
  commande.belongsTo(naturecolis, {
    as: "natureColi",
    foreignKey: "natureColisId"
  });
  naturecolis.hasMany(commande, {
    as: "commandes",
    foreignKey: "natureColisId"
  });
  cartepaiment.belongsTo(personne, {
    as: "personne",
    foreignKey: "personneId"
  });
  personne.hasMany(cartepaiment, {
    as: "cartepaiments",
    foreignKey: "personneId"
  });
  document.belongsTo(personne, {
    as: "personne",
    foreignKey: "personneId"
  });
  personne.hasMany(document, {
    as: "documents",
    foreignKey: "personneId"
  });
  personnemorale.belongsTo(personne, {
    as: "personne",
    foreignKey: "personneId"
  });
  personne.hasOne(personnemorale, {
    as: "personnemorale",
    foreignKey: "personneId"
  });
  personnephysique.belongsTo(personne, {
    as: "personne",
    foreignKey: "personneId"
  });
  personne.hasOne(personnephysique, {
    as: "personnephysique",
    foreignKey: "personneId"
  });
  utilisateur.belongsTo(personne, {
    as: "personne",
    foreignKey: "personneId"
  });
  personne.hasMany(utilisateur, {
    as: "utilisateurs",
    foreignKey: "personneId"
  });
  pmsecteuractivite.belongsTo(personnemorale, {
    as: "personne",
    foreignKey: "personneId"
  });
  personnemorale.hasMany(pmsecteuractivite, {
    as: "pmsecteuractivites",
    foreignKey: "personneId"
  });
  transporteur.belongsTo(personnemorale, {
    as: "entreprise",
    foreignKey: "entrepriseId"
  });
  personnemorale.hasMany(transporteur, {
    as: "transporteurs",
    foreignKey: "entrepriseId"
  });
  transporteur.belongsTo(personnephysique, {
    as: "personne",
    foreignKey: "personneId"
  });
  personnephysique.hasOne(transporteur, {
    as: "transporteur",
    foreignKey: "personneId"
  });
  commande.belongsTo(plagepoids, {
    as: "plagePoid",
    foreignKey: "plagePoidsId"
  });
  plagepoids.hasMany(commande, {
    as: "commandes",
    foreignKey: "plagePoidsId"
  });
  vehiculetype.belongsTo(plagepoids, {
    as: "plagePoid",
    foreignKey: "plagePoidsId"
  });
  plagepoids.hasMany(vehiculetype, {
    as: "vehiculetypes",
    foreignKey: "plagePoidsId"
  });
  pmsecteuractivite.belongsTo(secteuractivite, {
    as: "secteurActivite",
    foreignKey: "secteurActiviteId"
  });
  secteuractivite.hasMany(pmsecteuractivite, {
    as: "pmsecteuractivites",
    foreignKey: "secteurActiviteId"
  });
  disponibilite.belongsTo(transporteur, {
    as: "transporteur",
    foreignKey: "transporteurId"
  });
  transporteur.hasMany(disponibilite, {
    as: "disponibilites",
    foreignKey: "transporteurId"
  });
  commande.belongsTo(utilisateur, {
    as: "user",
    foreignKey: "userId"
  });
  utilisateur.hasMany(commande, {
    as: "commandes",
    foreignKey: "userId"
  });
  piecevehicule.belongsTo(vehicule, {
    as: "vehicule",
    foreignKey: "vehiculeId"
  });
  vehicule.hasMany(piecevehicule, {
    as: "piecevehicules",
    foreignKey: "vehiculeId"
  });
  transporteur.belongsTo(vehicule, {
    as: "vehicule",
    foreignKey: "vehiculeId"
  });
  vehicule.hasMany(transporteur, {
    as: "transporteurs",
    foreignKey: "vehiculeId"
  });
  vehicule.belongsTo(vehiculetype, {
    as: "vehiculeType",
    foreignKey: "vehiculeTypeId"
  });
  vehiculetype.hasMany(vehicule, {
    as: "vehicules",
    foreignKey: "vehiculeTypeId"
  });

  return {
    sequelize,
    cartepaiment,
    commande,
    demandelivraison,
    destination,
    disponibilite,
    document,
    encaissement,
    enlevement,
    livraison,
    modeencaissement,
    motifannulationlivraison,
    naturecolis,
    personne,
    personnemorale,
    personnephysique,
    piecevehicule,
    plagepoids,
    pmsecteuractivite,
    secteuractivite,
    statutdemande,
    statutencaissement,
    statutlivraison,
    transporteur,
    utilisateur,
    vehicule,
    vehiculetype,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
