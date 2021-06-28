const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commande', {
    commandeId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'userId'
      }
    },
    natureColisId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'naturecolis',
        key: 'id'
      }
    },
    plagePoidsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'plagepoids',
        key: 'id'
      }
    },
    encaissementId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'encaissement',
        key: 'encaissementId'
      },
      unique: "fk_Commande_Encaissement1"
    },
    nombreChariot: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombreColis: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isHorsGabarit: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    adresseDepart: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    adresseArrivee: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    commentaire: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'commande',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "commandeId" },
        ]
      },
      {
        name: "encaissementId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "encaissementId" },
        ]
      },
      {
        name: "fk_Commande_Utilisateur1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_Commande_NatureColis1_idx",
        using: "BTREE",
        fields: [
          { name: "natureColisId" },
        ]
      },
      {
        name: "fk_Commande_Encaissement1_idx",
        using: "BTREE",
        fields: [
          { name: "encaissementId" },
        ]
      },
      {
        name: "fk_Commande_PlagePoids1_idx",
        using: "BTREE",
        fields: [
          { name: "plagePoidsId" },
        ]
      },
    ]
  });
};
