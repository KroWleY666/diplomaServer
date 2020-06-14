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
      allowNull: true
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true
    },
    age: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        var date = new Date(this.getDataValue('age'))
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yy = date.getFullYear() ;
        return dd + '.' + mm + '.' + yy;
      },
    },
    heigth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weigth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    /*user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },*/
    group_id: { //group_id
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
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
    /*Participant.belongsToMany(models.Group, { //hasMany
      through: models.PartGroup,
      foreignKey: 'participant_id',      
      as: 'participants'
    }),*/
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
    /*Participant.belongsTo(models.User, {
    //  foreignKey: 'user_id',
      //as: 'trains',
      foreignKey: 'fk_userid', 
      targetKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),*/
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