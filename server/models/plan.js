module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    plan_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    filter_user_id: { 
      allowNull: false,
      type: DataTypes.INTEGER
    },
    /*train_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },*/
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  Plan.associate = models => {
    Plan.belongsTo(models.Filter, {
      foreignKey: 'filter_user_id'
    }),
    Plan.belongsTo(models.Participant, {
      foreignKey: 'plan_id'
    }),
    Plan.hasMany(models.Train, {
      foreignKey: 'planTrain',
      as: 'trainsOfPlan'
    })
  };
  return Plan;
};