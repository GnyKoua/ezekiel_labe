export default (sequelize, Sequelize) => {
  const Livraison = sequelize.define('livraison', {

    livraison_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    }
  })
  return Livraison
}
