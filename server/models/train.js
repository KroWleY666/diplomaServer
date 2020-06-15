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
      type: DataTypes.STRING
    }
  });

  Train.associate = models => {
    Train.belongsToMany(models.DateTrain, {
      through: models.DETrain,
      as: 'dates',
      foreignKey: 'train_id'
    }),
    Train.belongsToMany(models.Exercise, {
      as: 'exercises', 
      through: models.TrainExercise,
      foreignKey: 'train_id'
    }),
    Train.belongsTo(models.TypeTrain, {
      as: 'types', 
      foreignKey: 'type_train_id'
    }),
    Train.belongsTo(models.LevelTrain, {
      as: 'levels', 
      foreignKey: 'level_train_id'
    })
  };
  return Train;
};
