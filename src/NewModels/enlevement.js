const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('enlevement', {
    commandeId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'commande',
        key: 'commandeId'
      }
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    signature: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    validatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'enlevement',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "commandeId" },
        ]
      },
    ]
  });
};
