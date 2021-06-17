export default (sequelize, Sequelize) => {
  const Disponibilite = sequelize.define("disponibilite", {
    disp_id: {
      type: Sequelize.INTEGER(100),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    statut: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    dateDebut: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    dateFin: {
      type: Sequelize.DATE,
      allowNull: true,
      //defaultValue: 'null'
    },
    longitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
    //  defaultValue: 2.9110
    },
    latitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
    //  defaultValue: 48.9505
    },
    liv_id: {
        type: Sequelize.INTEGER,
         allowNull: true,
    },
  });
  return Disponibilite;
};
