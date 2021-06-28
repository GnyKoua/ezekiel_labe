const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('document', {
    documentId: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    personneId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'personne',
        key: 'personneId'
      }
    },
    documentType: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    documentTypeLibelle: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'document',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "documentId" },
        ]
      },
      {
        name: "documentId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "documentId" },
        ]
      },
      {
        name: "fk_Document_Personne_idx",
        using: "BTREE",
        fields: [
          { name: "personneId" },
        ]
      },
    ]
  });
};
