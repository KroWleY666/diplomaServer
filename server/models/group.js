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
    Group.hasMany(models.User, {
      foreignKey: 'group_id',
      as: 'userGroup'
    }),
    Group.hasMany(models.Participant, {
      foreignKey: 'group_id',
      as: 'groupParticipants'
    })
  };
  return Group;
};