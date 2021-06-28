const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personne', {
    personneId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    nomCourant: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "telephone_UNIQUE"
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    emailSecondaire: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'personne',
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
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "telephone_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "telephone" },
        ]
      },
    ]
  });
};
