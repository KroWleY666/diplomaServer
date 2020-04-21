'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupEvent = sequelize.define('GroupEvent', {
    ge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  GroupEvent.associate = function(models) {
    // associations can be defined here
  };
  return GroupEvent;
};