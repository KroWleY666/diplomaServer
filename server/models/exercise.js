module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    exercise_id: { 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    duration:  {
      type: DataTypes.INTEGER
    },
    approach: {
      type: DataTypes.INTEGER
    },
    count: {
      type: DataTypes.INTEGER
    }/*,
    day: {
      type: DataTypes.STRING //в тренировки
    }*/
  });
  Exercise.associate  = models => {
    Exercise.belongsToMany(models.Train, {
      as: 'trains', 
      through: models.TrainExercise,
      foreignKey: 'exercise_id'
    })
    // associations can be defined here
  };
  return Exercise;
};