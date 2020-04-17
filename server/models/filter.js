module.exports = (sequelize, DataTypes) => {
  const Filter = sequelize.define('Filter', {
    filter_id: { 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    goal: { 
      allowNull: true,
      type: DataTypes.STRING
    },
    level:  { 
      allowNull: true,
      type: DataTypes.STRING
    },
    period:  { 
      allowNull: true,
      type: DataTypes.STRING
    },
    type:  { 
      allowNull: true,
      type: DataTypes.STRING
    },
    duration:  { 
      allowNull: true,
      type: DataTypes.STRING
    }
  });
  Filter.associate = models => {
    Filter.belongsToMany(models.Plan, {
      through: models.FilterPlan,
      as: 'plans',
      foreignKey: 'filter_id'
     // onDelete: 'CASCADE',
    })
    // associations can be defined here
  };
  return Filter;
};