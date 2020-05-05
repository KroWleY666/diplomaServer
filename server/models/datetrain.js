'use strict';
module.exports = (sequelize, DataTypes) => {
  const DateTrain = sequelize.define('DateTrain', {
    dt_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  DateTrain.associate = models => {
    DateTrain.belongsToMany(models.Train, {
      through: models.DETrain,
      as: 'trains',
      foreignKey: 'dt_id',
      otherKey: 'train_id'
    }),
    DateTrain.belongsTo(models.Participant, {
      // as: 'exercises', 
      onDelete: 'CASCADE',
       //through: models.TrainExercise,
       foreignKey: 'participant_id'//,
       //otherKey: 'exercise_id'
     })
  };
  return DateTrain;
};