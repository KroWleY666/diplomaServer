module.exports = (sequelize, DataTypes) => {
  const Muscle = sequelize.define('Muscle', {
    mscl_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  Muscle.associate = models => {
    Muscle.belongsToMany(models.Exercise, {
      as: 'exParams', 
      through: models.MuscleEP,
      foreignKey: 'mscl_id'
    })
  };
  return Muscle;
};