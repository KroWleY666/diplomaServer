'use strict';
module.exports = (sequelize, DataTypes) => {
  const DateTrain = sequelize.define('DateTrain', {
    dt_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    from: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        var date = new Date(this.getDataValue('from'))
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yy = date.getFullYear() ;
        return dd + '.' + mm + '.' + yy;
      },
    },
    to: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        var date = new Date(this.getDataValue('to'))
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yy = date.getFullYear() ;
        return dd + '.' + mm + '.' + yy;
      },
    }
    /*title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }*/
  });
  DateTrain.associate = models => {
    DateTrain.belongsToMany(models.Train, {
      through: models.DETrain,
      as: 'trains',
      foreignKey: 'dt_id',
      otherKey: 'train_id'
    }),
    DateTrain.belongsTo(models.Participant, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: 'participant_id'
     })
  };
  return DateTrain;
};