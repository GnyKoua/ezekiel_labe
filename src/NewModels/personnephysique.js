const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personnephysique', {
    personneId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personne',
        key: 'personneId'
      }
    },
    nom: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    prenoms: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dateNaissance: {
      type: DataTypes.DATE,
      allowNull: false
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'personnephysique',
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
    ]
  });
};
