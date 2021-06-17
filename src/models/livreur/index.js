export default (sequelize, Sequelize) => {
  const Livreur = sequelize.define('livreur', {

    liv_id: {
      type: Sequelize.INTEGER(100),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    denomination: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    activite: {
      type: Sequelize.STRING(60),
      allowNull: true,
    },
    siret: {
      type: Sequelize.STRING(70),
      allowNull: true,
    },

    representant: {
      type: Sequelize.STRING(70),
      allowNull: true,
    },
    adresse: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    numero: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    vehicule: {
      type: Sequelize.STRING(70),
      allowNull: true,
    },
    assurance: {
      type: Sequelize.STRING(70),
      allowNull: true,
    },
    adresseFacturation: {
      type: Sequelize.STRING(90),
      allowNull: true,
    },

    email: {
      type: Sequelize.STRING(90),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(90),
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
    livreurType: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    disponibilite: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    dateDebut: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    dateFin: {
      type: Sequelize.DATE,
      allowNull: true,
      //defaultValue: 'null'
    },

    longitude: {
      type: Sequelize.FLOAT,
      allowNull: true,

    },
    latitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
      //defaultValue: 'null'
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  })
  return Livreur
}
