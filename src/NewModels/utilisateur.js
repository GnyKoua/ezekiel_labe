const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilisateur', {
    userId: {
      type: DataTypes.STRING(10),
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
    userType: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    userTypeLibelle: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    login: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "login_UNIQUE"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'utilisateur',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "userId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "login_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "login" },
        ]
      },
      {
        name: "fk_Utilisateur_Personne1_idx",
        using: "BTREE",
        fields: [
          { name: "personneId" },
        ]
      },
    ]
  });
};
