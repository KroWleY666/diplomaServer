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
      type: DataTypes.STRING,
      allowNull: false
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
      onDelete: 'CASCADE'
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
   /* Participant.belongsTo(models.Plan, {
      foreignKey: 'plan_id',
      as: 'partPlan'
    })*/
  };
  return Participant;
};