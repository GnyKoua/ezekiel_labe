export default (sequelize, Sequelize) => {
  const StatutLivraison = sequelize.define('statutLivraison', {

    statutLivraison_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,

    },
    code: {
      type: Sequelize.STRING(4),
      allowNull: true,
    },
    libelle: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  })
  return StatutLivraison
}
