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
    },
    te_id: { //тип упражнения только один
      allowNull: false,
      type: DataTypes.INTEGER
    }
    /*exp_id:  {
      allowNull: false,
      type: DataTypes.INTEGER
    }*/
  });
  Exercise.associate  = models => {
    Exercise.belongsToMany(models.Train, {
      as: 'trains', 
      through: models.TrainExercise,
      foreignKey: 'exercise_id',
      onUpdate: 'CASCADE'
    }),
    Exercise.belongsToMany(models.Character, {
      as: 'characters', 
      through: models.CharEx,
      foreignKey: 'exercise_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    /*Exercise.belongsTo(models.ExercParam, {
      foreignKey: 'exp_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),*/
    Exercise.belongsTo(models.TypeEx, {
      //as: 'types', 
      //through: models.CharEx,
      foreignKey: 'te_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    Exercise.belongsToMany(models.Muscle, {
      as: 'muscles', 
      through: models.MuscleEP,
      foreignKey: 'exercise_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // associations can be defined here
  };
  return Exercise;
};