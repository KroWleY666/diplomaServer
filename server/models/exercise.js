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
    definition:  {
      allowNull: false,
      type: DataTypes.STRING
    },
    img:  {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  Exercise.associate  = models => {
    Exercise.belongsToMany(models.Train, {
      as: 'trains', 
      through: models.TrainExercise,
      foreignKey: 'exercise_id',
      onUpdate: 'CASCADE'
    }),
    /*Exercise.hasMany(models.ExercParam, {
      foreignKey: 'exercise_id',
      as: 'filters'
    }),*/
    Exercise.belongsToMany(models.Character, {
      as: 'characters', 
      through: models.CharEx,
      foreignKey: 'exercise_id'
    }),
    Exercise.belongsTo(models.ExercParam, {
      foreignKey: 'exp_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // associations can be defined here
  };
  return Exercise;
};