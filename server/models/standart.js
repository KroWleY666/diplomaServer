'use strict';
module.exports = (sequelize, DataTypes) => {
  const Standart = sequelize.define('Standart', {
    standart_id:  {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    test: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  });
  Standart.associate = function(models) {
    Standart.belongsTo(models.Participant, {
      foreignKey: 'participant_id',
      onDelete: 'CASCADE'
    })
    // associations can be defined here
  };
  return Standart;
};