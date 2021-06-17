export default (sequelize, Sequelize) => {
  const StatutDemandeLivraison = sequelize.define('statutDemandeLivraison', {

    statutDemandeLivraison_id: {
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
  return StatutDemandeLivraison
}
