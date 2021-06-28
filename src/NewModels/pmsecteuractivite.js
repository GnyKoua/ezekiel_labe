const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pmsecteuractivite', {
    personneId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personnemorale',
        key: 'personneId'
      }
    },
    secteurActiviteId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'secteuractivite',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'pmsecteuractivite',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "personneId" },
          { name: "secteurActiviteId" },
        ]
      },
      {
        name: "fk_PersonneMorale_has_SecteurActivite_SecteurActivite1_idx",
        using: "BTREE",
        fields: [
          { name: "secteurActiviteId" },
        ]
      },
      {
        name: "fk_PersonneMorale_has_SecteurActivite_PersonneMorale1_idx",
        using: "BTREE",
        fields: [
          { name: "personneId" },
        ]
      },
    ]
  });
};
