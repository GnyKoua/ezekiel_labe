const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statutencaissement', {
    statutId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    encaissementId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'encaissement',
        key: 'encaissementId'
      }
    },
    statutEncaissementType: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    statutEncaissementTypeLibelle: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'statutencaissement',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "statutId" },
        ]
      },
      {
        name: "fk_StatutEncaissement_Encaissement1_idx",
        using: "BTREE",
        fields: [
          { name: "encaissementId" },
        ]
      },
    ]
  });
};
