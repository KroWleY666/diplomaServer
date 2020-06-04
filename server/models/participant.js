module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        var date = new Date(this.getDataValue('age'))
        //получаем день
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
  
        //получаем месяц
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        //получаем год
        var yy = date.getFullYear() ;

        return dd + '.' + mm + '.' + yy;
      },
    },
    heigth: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weigth: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });
  Participant.associate = models => {
    Participant.belongsTo(models.Group, {
      foreignKey: 'group_id',
      targetKey: 'group_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    Participant.hasMany(models.Standart, {
      foreignKey: 'participant_id',
      as: 'standarts'
    }),
    Participant.hasMany(models.Event, {
      foreignKey: 'participant_id',
      as: 'events'
    }),
    Participant.hasMany(models.Parameter, {
      foreignKey: 'participant_id',
      as: 'parameters'
    }),
    /*Participant.hasMany(models.Train, {
      foreignKey: 'participant_id',
      as: 'trains'
    }),*/
    Participant.hasMany(models.DateTrain, {
      foreignKey: 'participant_id',
      as: 'datesOfTrain'
    })
  };
  return Participant;
};