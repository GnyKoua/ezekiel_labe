const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicule', {
    vehiculeId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    vehiculeTypeId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'vehiculetype',
        key: 'id'
      }
    },
    matricule: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "matricule_UNIQUE"
    },
    marque: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    numeroAssurVeh: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    numeroAssurMar: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'vehicule',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "vehiculeId" },
        ]
      },
      {
        name: "matricule_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "matricule" },
        ]
      },
      {
        name: "fk_Vehicule_VehiculeType1_idx",
        using: "BTREE",
        fields: [
          { name: "vehiculeTypeId" },
        ]
      },
    ]
  });
};
