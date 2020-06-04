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
      },
      //set() {
       /* model.data.val( moment().format('DD/MM/YYYY') );
        console.log( model.data)
        var t =  Date( this.getDataValue('data') )
        console.log(t)
        // var input = moment(new Date(this.getDataValue('data'))).format("YYYY-MM-DD HH:mm:ss");
        // console.log(input)

        let date = new Date(this.getDataValue('data'))
       // data: function(fullname) {
         //const nmo = this.getDataValue('data').toLocaleDateString('en-GB')
         //console.log(nmo)
         let regexp = /(\d{4})\/(\d{2})\/(\d{2})/;
let options = {year: "4-digit", month: "2-digit", day: "2-digit"};

let dateOutput = `${date.toLocaleDateString('en-US', options).replace(regexp, '$3/$1/$2')} ${date.toLocaleTimeString('en-US').slice(0, -6)}`
console.log(dateOutput)
        this.getDataValue('data').formatDate("yyyy-MM-dd",row6.DATE)
        let current_datetime = new Date(this.getDataValue('data'))
        let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
        console.log(formatted_date)

        const k = format(this.getDataValue('data'), 'MM/DD/YYYY')
        console.log(`${k}`)
        date = moment(new Date(this.setDataValue('data'))).format('MM/DD/YYYY')
        console.log(`${date}`)
        var dd = this.date.setDate();
        if (dd < 10) dd = '0' + dd;
        var mm = this.date.setMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yy = this.date.setFullYear() ;
        this.data = dd + '/' + mm + '/' + yy;
        this.date = new Date(this.setDataValue('data'))*/
        //return dd + '/' + mm + '/' + yy;
         /* var split = date.split('/')
          data = split[1]+'.'+ split[0] +'.'+split[2]
          return data*/
 // }
       // return moment(this.setDataValue('data')).format('DD/MM/YYYY');
        /*var date = new Date()
       // let date = new Date(this.getDate('data'))
        let day = date.setUTCDate(this.getDataValue('data').getUTCDate())
        let month = date.setUTCMonth(this.getDataValue('data').getUTCMonth())
        let year = date.setFullYear(this.getDataValue('data').getFullYear())
       // console.log(`${data}`)
         //new Date(data)//.format('DD/MM/YYYY');
         return day+'.'+month+'.'+year// moment(this.getDataValue('data')).format('DD/MM/YYYY');//
         */
     // }
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
      /*hooks: {
          beforeCreate: function(){

            format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
        //Standart.data = moment(new Date(this.getDataValue('data'))).format("DD/MM/YYYY HH:mm:ss");
        console.log(data)
          },
          beforeValidate: function(transaction, options, fn) {
            console.log('beforeCreate hook')
            var ObjectToHash = transaction.get();
            console.log(ObjectToHash)
            makehash(ObjectToHash)
            .then(function(res){
              console.log('hash created for: '+transaction.id)
              transaction.hash = res;
              fn(null, transaction)
            })
    
          }
      }*/
  
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