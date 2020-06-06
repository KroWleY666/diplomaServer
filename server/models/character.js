module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    character_id:  {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    count: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    approach: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    duration: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  Character.associate = models => {
    Character.hasMany(models.TrainExercise, {
      as: 'trExerc', 
      foreignKey: 'character_id',
      onUpdate: 'CASCADE'
    })
  };
  return Character;
};


