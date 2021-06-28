const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statutlivraison', {
    statutId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    livraisonId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'livraison',
        key: 'livraisonId'
      }
    },
    statutLivraisonType: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    statutLivraisonTypeLibelle: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'statutlivraison',
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
        name: "fk_StatutLivraison_Livraison1_idx",
        using: "BTREE",
        fields: [
          { name: "livraisonId" },
        ]
      },
    ]
  });
};
