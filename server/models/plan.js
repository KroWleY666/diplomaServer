module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    plan_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    exercise_id: {
      type: DataTypes.INTEGER
    }
  });
  Plan.associate = function(models) {
    // associations can be defined here
  };
  return Plan;
};