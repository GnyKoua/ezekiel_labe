const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehiculetype', {
    id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    libelle: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    plagePoidsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'plagepoids',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'vehiculetype',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Identifiant_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_VehiculeType_PlagePoids1_idx",
        using: "BTREE",
        fields: [
          { name: "plagePoidsId" },
        ]
      },
    ]
  });
};
