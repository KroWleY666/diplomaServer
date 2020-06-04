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
      type: DataTypes.DATE,//ONLY
      allowNull: false,
      get() {
        var date = new Date(this.getDataValue('data'))
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yy = date.getFullYear() ;
        return dd + '.' + mm + '.' + yy;
      },
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
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // associations can be defined here
  };
  return Event;
};