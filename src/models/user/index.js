export default (sequelize, Sequelize) => {
  const User = sequelize.define('user', {

    id: {
      type: Sequelize.INTEGER(100),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,

    },
    nom: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    prenom: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    numero: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    adresse: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },

    denomination: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    activite: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    siret: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    representant: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },

    assurance: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    adresseFacturation: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    immatriculation: {
      type: Sequelize.INTEGER(200),
      allowNull: true,
    },
    vehicule: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },

    licence: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    extraitkbis: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    permis: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    userType: {
      type: Sequelize.STRING,
      allowNull: true,

    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  })
  return User
}
