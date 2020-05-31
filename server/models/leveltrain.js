module.exports = (sequelize, DataTypes) => {
  const LevelTrain = sequelize.define('LevelTrain', {
    level_train_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  LevelTrain.associate = models => {
    LevelTrain.belongsToMany(models.Train, {
      as: 'trains', 
      through: models.TrLevId,
      foreignKey: 'level_train_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // associations can be defined here
  };
  return LevelTrain;
};