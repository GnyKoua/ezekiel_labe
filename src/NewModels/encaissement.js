const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('encaissement', {
    encaissementId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    modeId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'modeencaissement',
        key: 'id'
      }
    },
    carteId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'cartepaiment',
        key: 'carteId'
      }
    },
    reference: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    montant: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'encaissement',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "encaissementId" },
        ]
      },
      {
        name: "fk_Encaissement_ModeEncaissement1_idx",
        using: "BTREE",
        fields: [
          { name: "modeId" },
        ]
      },
      {
        name: "fk_Encaissement_CartePaiment1_idx",
        using: "BTREE",
        fields: [
          { name: "carteId" },
        ]
      },
    ]
  });
};
