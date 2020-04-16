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
    },
    day: {
      type: DataTypes.STRING
    }
  });
  Exercise.associate  = models => {
    /*Exercise.hasMany(models.Plan, {
      foreignKey: 'exercise_id'
     // onDelete: 'CASCADE',
    }),*/
   /* Exercise.hasMany(models.Train, {
      foreignKey: 'trainExercise'
     // onDelete: 'CASCADE',
    }),*/
    /*Exercise.hasMany(models.TrainExercise, {
      foreignKey: 'exercise_id',
    //  targetKey: 'exercise_id'
     // onDelete: 'CASCADE',
    })*/

    Exercise.belongsToMany(models.Train, {
      as: 'Trains', 
      through: 'TrainExercise',
      foreignKey: 'exercise_id',
      otherKey: 'train_id'//})
     // foreignKey: 'exercise_id',
    //  targetKey: 'exercise_id'
     // onDelete: 'CASCADE',
    })
    // associations can be defined here
  };
  return Exercise;
};