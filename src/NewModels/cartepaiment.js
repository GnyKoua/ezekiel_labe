const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cartepaiment', {
    carteId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    personneId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'personne',
        key: 'personneId'
      }
    },
    numero: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    titulaire: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dateExpiration: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    crypto: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cartepaiment',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "carteId" },
        ]
      },
      {
        name: "fk_CartePaiment_Personne1_idx",
        using: "BTREE",
        fields: [
          { name: "personneId" },
        ]
      },
    ]
  });
};
