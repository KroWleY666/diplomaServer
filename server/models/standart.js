const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Standart = sequelize.define('Standart', {
    standart_id:  {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    stn_id: {
      type: DataTypes.INTEGER,
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
      }
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  });
  Standart.associate = function(models) {
    Standart.belongsTo(models.Participant, {
      foreignKey: 'participant_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    Standart.belongsTo(models.StandName, {
      foreignKey: 'stn_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  };
  return Standart;
};