'use strict';
module.exports = (sequelize, DataTypes) => {
  const TrainExercise = sequelize.define('TrainExercise', {
    train_ex_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    train_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    exercise_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    character_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    
     /* get () {
        this.createdAt = new Date()
      },
     /* set () {
        this.createdAt = new Date()
      }*/
    
  
  });

  TrainExercise.associate = models => {
    /*TrainExercise.belongsTo(models.Train, {
      foreignKey: 'train_id',
     // as: 'participants'
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    TrainExercise.belongsTo(models.Exercise, {
      foreignKey: 'exercise_id',
     // as: 'participants'
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),*/
    /*TrainExercise.belongsToMany(models.Character, {
      as: 'characters', 
      through: models.CharEx,
      foreignKey: 'train_ex_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),*/
    TrainExercise.belongsTo(models.Character, {
     // as: 'characters', 
     // through: models.CharEx,
      foreignKey: 'character_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    TrainExercise.belongsTo(models.Exercise, {
      // as: 'characters', 
      // through: models.CharEx,
       foreignKey: 'exercise_id',
       onDelete: 'CASCADE',
       onUpdate: 'CASCADE'
     }),
     TrainExercise.belongsTo(models.Train, {
      // as: 'characters', 
      // through: models.CharEx,
       foreignKey: 'train_id',
       onDelete: 'CASCADE',
       onUpdate: 'CASCADE'
     })
    // associations can be defined here
  };
  return TrainExercise;
};