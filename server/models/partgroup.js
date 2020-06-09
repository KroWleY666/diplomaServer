'use strict';
module.exports = (sequelize, DataTypes) => {
  const PartGroup = sequelize.define('PartGroup', {
    part_group_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    group_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    participant_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  PartGroup.associate = function(models) {
    // associations can be defined here
  };
  return PartGroup;
};