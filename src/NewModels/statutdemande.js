const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statutdemande', {
    statutId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    demandeId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'demandelivraison',
        key: 'demandeId'
      }
    },
    statutDemandeTypeLibelle: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    statutDemandeType: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    motifAnnulationId: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'motifannulationlivraison',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'statutdemande',
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
        name: "fk_StatutDemande_DemandeLivraison1_idx",
        using: "BTREE",
        fields: [
          { name: "demandeId" },
        ]
      },
      {
        name: "fk_StatutDemande_MotifAnnulationLivraison1_idx",
        using: "BTREE",
        fields: [
          { name: "motifAnnulationId" },
        ]
      },
    ]
  });
};
