module.exports = (sequelize, DataTypes) => {
  const Train = sequelize.define('Train', {
    train_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    /*plan_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    exercise_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },*/
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    from: {
      allowNull: false,
      type: DataTypes.STRING
    },
    to: {
      allowNull: false,
      type: DataTypes.STRING
    },
  });

  Train.associate = models => {
    Train.belongsTo(models.Plan, {
      foreignKey: 'planTrain'
    }),
    /*Train.belongsTo(models.Exercise, { //hasMany
      foreignKey: 'trainExercise',
      as: 'exercisesOfTrain'
    }),*/
    Train.belongsToMany(models.Exercise, {
      as: 'Exercises', 
      through: 'TrainExercise',
      foreignKey: 'train_id',
      otherKey: 'exercise_id'
    })

    /*Train.hasMany(models.TrainExercise, { //hasMany
      foreignKey: 'train_id',
     // targetKey: 'train_id',
      as: 'exercisesOfTrain'
     // as: 'exercisesOfTrain'
    })*/
  };
  return Train;
};
