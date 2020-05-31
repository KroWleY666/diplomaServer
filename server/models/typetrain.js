'use strict';
module.exports = (sequelize, DataTypes) => {
  const TypeTrain = sequelize.define('TypeTrain', {
    type_train_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  TypeTrain.associate = models => {
    TypeTrain.hasMany(models.Train, {
      as: 'trains', 
     // through: models.TrTypeId,
      foreignKey: 'type_train_id'
    })
    // associations can be defined here
  };
  return TypeTrain;
};