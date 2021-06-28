const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transporteur', {
    personneId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personnephysique',
        key: 'personneId'
      }
    },
    vehiculeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'vehicule',
        key: 'vehiculeId'
      }
    },
    entrepriseId: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'personnemorale',
        key: 'personneId'
      }
    }
  }, {
    sequelize,
    tableName: 'transporteur',
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
        name: "fk_Transporteur_Vehicule1_idx",
        using: "BTREE",
        fields: [
          { name: "vehiculeId" },
        ]
      },
      {
        name: "fk_Transporteur_PersonneMorale1_idx",
        using: "BTREE",
        fields: [
          { name: "entrepriseId" },
        ]
      },
    ]
  });
};
