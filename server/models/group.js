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
    },
    sport: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Group.associate = models => {
    Group.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
     // as: 'ownerOfGroup'
    }),
    Group.hasMany(models.Participant, {
      foreignKey: 'group_id',
      as: 'groupParticipants'
    })
  };
  return Group;
};