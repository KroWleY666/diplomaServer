'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    event_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false
    },
    definition: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Event.associate = models => {
    Event.belongsToMany(models.Group, {
      as: 'groups', 
      through: models.GroupEvent,
      foreignKey: 'event_id'
    }),
    Event.belongsTo(models.Participant, {
      foreignKey: 'participant_id',
     // as: 'participants'
      onDelete: 'CASCADE'
    })
    // associations can be defined here
  };
  return Event;
};