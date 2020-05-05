module.exports = (sequelize, DataTypes) => {
  const Train = sequelize.define('Train', {
    train_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    duration: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    level: {
      allowNull: false,
      type: DataTypes.STRING
    },
    definition: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });

  Train.associate = models => {
    Train.belongsToMany(models.Plan, {
      through: models.PlanTrain,
      as: 'plans',
      foreignKey: 'train_id',
      onDelete: 'CASCADE',
    }),
    Train.belongsToMany(models.DateTrain, {
      through: models.DETrain,
      as: 'dates',
      foreignKey: 'train_id',
      otherKey: 'dt_id'
     // onDelete: 'CASCADE',
    }),
    Train.belongsToMany(models.Exercise, {
      as: 'exercises', 
      through: models.TrainExercise,
      foreignKey: 'train_id'//,
      //otherKey: 'exercise_id'
    })
  };
  return Train;
};
