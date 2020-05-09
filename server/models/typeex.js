'use strict';
module.exports = (sequelize, DataTypes) => {
  const TypeEx = sequelize.define('TypeEx', {
    te_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  TypeEx.associate = models => {
    TypeEx.belongsTo(models.ExercParam, {
      foreignKey: 'te_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // associations can be defined here
  };
  return TypeEx;
};