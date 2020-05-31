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
    /*test: {
      type: DataTypes.STRING,
      allowNull: false
    },*/
    data: {
      type: DataTypes.STRING,
      allowNull: false
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