'use strict';
module.exports = (sequelize, DataTypes) => {
  const FilterPlan = sequelize.define('FilterPlan', {
    fp_id: { 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    filter_id: { 
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Filters',
        key: 'filter_id'
      }
    },
    plan_id: { 
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Plans',
        key: 'plan_id'
      }
    }
  });
  FilterPlan.associate = function(models) {
    // associations can be defined here
  };
  return FilterPlan;
};