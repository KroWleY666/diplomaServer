module.exports = (sequelize, DataTypes) => {
  const Parameter = sequelize.define('Parameter', {
    param_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    pn_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
   /* measure: {
      type: DataTypes.STRING,
      allowNull: false
    },*/
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
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  Parameter.associate = models => {
    Parameter.belongsTo(models.Participant, {
      foreignKey: 'participant_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    Parameter.belongsTo(models.ParamName, {
      foreignKey: 'pn_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  };
  return Parameter;
};


