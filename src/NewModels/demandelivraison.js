const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('demandelivraison', {
    demandeId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    commandeId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'commande',
        key: 'commandeId'
      }
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'demandelivraison',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "demandeId" },
        ]
      },
      {
        name: "fk_DemandeLivraison_Commande1_idx",
        using: "BTREE",
        fields: [
          { name: "commandeId" },
        ]
      },
    ]
  });
};
