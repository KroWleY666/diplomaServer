'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parameter = sequelize.define('Parameter', {
    param_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  Parameter.associate = models => {
    Parameter.belongsTo(models.Participant, {
      foreignKey: 'participant_id',
      onDelete: 'CASCADE'
    })
    // associations can be defined here
  };
  return Parameter;
};