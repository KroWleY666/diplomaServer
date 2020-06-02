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
        //получаем день
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
  
        //получаем месяц
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        //получаем год
        var yy = date.getFullYear() ;

        return dd + '.' + mm + '.' + yy;
       // console.log(`${data}`)
         //new Date(data)//.format('DD/MM/YYYY');
        //return day+'.'+month+'.'+year//[sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('data'), '%d %b %y'), 'data']// moment(this.getDataValue('data')).format('DD/MM/YYYY');//
      },
      /*set() {
        var date = new Date()
       // let date = new Date(this.getDate('data'))
        let day = date.setUTCDate(this.getDataValue('data').getUTCDate())
        let month = date.setUTCMonth(this.getDataValue('data').getUTCMonth())
        let year = date.setFullYear(this.getDataValue('data').getFullYear())
       // console.log(`${data}`)
         //new Date(data)//.format('DD/MM/YYYY');
         return day+'.'+month+'.'+year// moment(this.getDataValue('data')).format('DD/MM/YYYY');//
      }*/
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