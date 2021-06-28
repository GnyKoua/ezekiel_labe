const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('piecevehicule', {
    pieceVehiculeId: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    vehiculeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'vehicule',
        key: 'vehiculeId'
      }
    },
    pieceVehiculeType: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pieceVehiculeTypeLibelle: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'piecevehicule',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pieceVehiculeId" },
        ]
      },
      {
        name: "pieceVehiculeId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pieceVehiculeId" },
        ]
      },
      {
        name: "fk_PieceVehicule_Vehicule1_idx",
        using: "BTREE",
        fields: [
          { name: "vehiculeId" },
        ]
      },
    ]
  });
};
