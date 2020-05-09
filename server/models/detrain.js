'use strict';
module.exports = (sequelize, DataTypes) => {
  const DETrain = sequelize.define('DETrain', {
    detrain_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    dt_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    train_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  DETrain.associate = models => {
    DETrain.belongsTo(models.Train, {
      foreignKey: 'train_id',
     // as: 'participants'
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    DETrain.belongsTo(models.DateTrain, {
      foreignKey: 'dt_id',
     // as: 'participants'
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // associations can be defined here
  };
  return DETrain;
};