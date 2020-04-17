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
    })
   /* Participant.belongsTo(models.Plan, {
      foreignKey: 'plan_id',
      as: 'partPlan'
    })*/
  };
  return Participant;
};