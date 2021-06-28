const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('livraison', {
    livraisonId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    demandeId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'demandelivraison',
        key: 'demandeId'
      },
      unique: "fk_Livraison_DemandeLivraison1"
    },
    dateFin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    note: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    avis: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'livraison',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "livraisonId" },
        ]
      },
      {
        name: "demandeId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "demandeId" },
        ]
      },
      {
        name: "fk_Livraison_DemandeLivraison1_idx",
        using: "BTREE",
        fields: [
          { name: "demandeId" },
        ]
      },
    ]
  });
};
