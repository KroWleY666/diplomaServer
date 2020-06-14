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
    type_train_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    duration: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    level_train_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    definition: {
      allowNull: false,
      type: DataTypes.STRING//,
      //validate: { len: [0,3000] }
    }
  });

  Train.associate = models => {
    /*Train.belongsToMany(models.Plan, {
      through: models.PlanTrain,
      as: 'plans',
      foreignKey: 'train_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),*/
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
      foreignKey: 'train_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
      //otherKey: 'exercise_id'
    }),
    Train.belongsTo(models.TypeTrain, {
      as: 'types', 
     // through: models.TrTypeId,
      foreignKey: 'type_train_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    Train.belongsTo(models.LevelTrain, {
      as: 'levels', 
      //through: models.TrLevId,
      foreignKey: 'level_train_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  };
  return Train;
};
