const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personnemorale', {
    personneId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personne',
        key: 'personneId'
      }
    },
    statutEntreprise: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    denomination: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    siret: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tva: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nomRepresentant: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    adresseSociale: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    adresseEtab: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    adresseFacturation: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    personneContact: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'personnemorale',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "personneId" },
        ]
      },
      {
        name: "fk_PersonneMorale_Personne1_idx",
        using: "BTREE",
        fields: [
          { name: "personneId" },
        ]
      },
    ]
  });
};
