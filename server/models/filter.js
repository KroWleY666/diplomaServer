module.exports = (sequelize, DataTypes) => {
  const Filter = sequelize.define('Filter', {
    filter_user_id: { 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    goal: { 
      type: DataTypes.STRING
    },
    level:  { 
      type: DataTypes.STRING
    },
    period:  { 
      type: DataTypes.STRING
    },
    type:  { 
      type: DataTypes.STRING
    },
    duration:  { 
      type: DataTypes.STRING
    }
  });
  Filter.associate = models => {
    Filter.hasMany(models.Plan, {
      foreignKey: 'filter_user_id',
      as: 'filterPlan'
     // onDelete: 'CASCADE',
    })
    // associations can be defined here
  };
  return Filter;
};