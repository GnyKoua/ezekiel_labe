export default (sequelize, Sequelize) => {
  const DemandeLivraison = sequelize.define('demandeLivraison', {

    demandeLivraison_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    distance: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  })
  return DemandeLivraison
}
