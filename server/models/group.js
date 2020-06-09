module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Group.associate = models => {
    /*Group.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
     // as: 'ownerOfGroup'
    }),*/
    Group.belongsToMany(models.User, {
      as: 'groups', 
      through: models.UserGroup,
      foreignKey: 'group_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    Group.belongsToMany(models.Event, {
      as: 'events', 
      through: models.GroupEvent,
      foreignKey: 'group_id'
    }),
    Group.belongsToMany(models.Participant, { //hasMany
      through: models.PartGroup,
      foreignKey: 'group_id',      
      as: 'participants'
    })
    /*Group.belongsToMany(models.Event, {
      as: 'events', 
      through: models.GroupEvent,
      foreignKey: 'group_id'
    })*/
  };
  return Group;
};