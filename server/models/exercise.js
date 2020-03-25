module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    exercise_id: { 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    duration:  {
      type: DataTypes.INTEGER
    },
    approach: {
      type: DataTypes.INTEGER
    },
    day: {
      type: DataTypes.STRING
    }
  });
  Exercise.associate = function(models) {
    // associations can be defined here
  };
  return Exercise;
};