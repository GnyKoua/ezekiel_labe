const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('disponibilite', {
    disponibiliteId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    transporteurId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'transporteur',
        key: 'personneId'
      }
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'disponibilite',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "disponibiliteId" },
        ]
      },
      {
        name: "fk_Disponibilite_Transporteur1_idx",
        using: "BTREE",
        fields: [
          { name: "transporteurId" },
        ]
      },
    ]
  });
};
