const Group = require('../models').Group
const User = require('../models').User
const Participant = require('../models').Participant
const Event = require('../models').Event
const UserGroup = require('../models').UserGroup

const bcrypt = require('bcryptjs')

var getAge = function(birth) {
 
  var today = new Date();
  var nowyear = today.getFullYear();
  var nowmonth = today.getMonth() +1
  if (nowmonth < 10) nowmonth = '0' + nowmonth;
  var nowday = today.getDate();
  if (nowday < 10) nowday = '0' + nowday;
  var datePat = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
 
  var matchArray = birth.match(datePat); // is the format ok?
    if (matchArray == null) {
        msg = "Date is not in a valid format.";
        return msg;
    }
 
  var birthday = matchArray[1];
  var birthmonth = matchArray[2]; // parse date into variables
  var birthyear = matchArray[3];

  var age = nowyear - birthyear;
  var age_month = nowmonth - birthmonth;
  var age_day = nowday - birthday;
  
  if(age_month < 0 || (age_month == 0  && age_day <0)) {
    age = parseInt(age) -1;
  }
  if (age_month == 0 && age_day == 0) {
    msg = `Поздравляем с Днем Рождения! Сегодня Вам исполнилось ${age} лет!`;
    console.log(`${msg}`)
  }
  console.log(`${age}`)
  return age
}

  let arr_num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const compareRandom = ( ) => Math.random() - 0.5;

  const randomInteger = ( min, max ) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

let generatePassword =  function () {
  let arr = [];
   arr = arr.concat(arr_num);
   arr = arr.concat(arr_en);
   arr = arr.concat(arr_EN);

  arr.sort(compareRandom);
  let password = '';
  let passLenght = 10;

  for (let i = 0; i < passLenght; i++) {
      password += arr[randomInteger(0, arr.length - 1)];
  }
  return password
//  document.querySelector('#result').textContent = password;

 /* var length = 12,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;*/
}


module.exports = {

  /*--------добавление/просмотр/удаление ТОЛЬКО ГРУПП--------*/

  /*--------создать группу--------*/
  async createGroup(req, res) {
   // try{
      let user = await User.findOne({where: {user_id: req.user_id}})
      let m = await Group.findOne({where: {title: req.body.title}})
      if(!m){
        //console.log(m)
        let t = await Group.create({title: req.body.title})
        let v = await UserGroup.create({
          user_id: req.user_id,
          group_id: t.group_id
        })


       // let f = user.addGroups(t)
        /*.then(nGr => {
          //console.log(user)
          console.log(nGr)
          user.addGroups(nGr)
          return res.status(201).send({nGr,user})
        })*/
        return res.status(201).send({v,user})
      }else{
        console.log('else '+m)
        return res.status(400).send('error')
        //.catch(error =>return res.status(400).send(error));
       // return res.status(400).send(error)
      }
   // }catch(err) {
   //   return res.status(400).send(err)
   // }
    
   /* Group.findOne({where: {
      title: req.body.title//,
      //sport: req.body.sport
    }}).then(group => 
      {
        if(group) {
          return res.status(404).send({
            message: 'Такая группа уже существует!'
          }); 
        } else {
          Group.create({
            title: req.body.title//,
            //sport: req.body.sport,
            //user_id: req.params.userId
          })
          .then(group => {
            return Group.findAll()
            .then(gr => res.status(201).send(gr))
           // res.status(201).send(group)
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));*/
  },
  
  /*--------список всех групп с зависимой моделью Participant--------*/
  async listGroups(req, res) {
    UserGroup.findAll({where: {user_id: req.user_id}})
    .then(async (group) => {
      if (!group) {
        return res.status(404).send({
          message: 'Групп нет!',
        });
      }
      let mas=[]
      for(g in group){
        mas[g] = await Group.findAll({where: {group_id: group[g].group_id}})
      }
      return res.status(200).send(mas)
      //console.log(group.group_id)
     
     // .then(gr => { return res.status(200).send(gr) })
      //.catch((error) => res.status(400).send(error));
  })
  .catch((error) => res.status(400).send(error));
    /*return Group
      .findAll({
        include: [{
          model: Participant,
          as: 'participants',
        },{
          model: Event,
          as: 'events',
        }],
      })
      .then((group) => {
        if (!group) {
          return res.status(404).send({
            message: 'Групп нет!',
          });
        }
      return res.status(200).send(group);
    })
    .catch((error) => res.status(400).send(error));*/
  },
  
  /*-----удалить группу с участниками-----*/
  destroyGroup(req, res) {
    Group
      .findOne({where: {group_id: req.params.group_id}})
      .then(group => {         
        if (!group) {              
          return res.status(404).send({
            message: 'Группа не найдена!',
          });
        }
        group
          .destroy()
          .then(group => {
            return Group.findAll()
            .then(gr => res.status(200).send({
              message: 'Группа удалена!', gr
            }))
        })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }, 
  


  /*--------добавление/просмотр/удаление УЧАСТНИКОВ ГРУПП--------*/

  /*--------добавить спортсмена в группу--------*/
  async addParticipant(req, res) {  
    let psPart = generatePassword()
    User.findOne({ where: {email: req.body.email}})
      .then(async user1 => {
        if (!user1) {
    User.create({
      email: req.body.email,
      password: psPart,
      salt: bcrypt.hashSync(psPart, 10),
      role_id: 2
    }).then(async user => { // если такой email уже есть
      Participant.create({
        name: req.body.name,
        surname: req.body.surname,
        sex: req.body.sex,
        age: req.body.age,
        heigth: req.body.heigth,
        weigth: req.body.weigth,
        user_id: user.user_id
      }).then(async participant => {
        //user.setParticipant(participant)
        UserGroup.create({
          user_id: user.user_id,
          group_id: req.body.group_id
        }).then(async pGr => {
          let age = getAge(participant.age)
          let group = await Group.findByPk(req.body.group_id)
          let group_name = group.title
          res.status(200).send({user,participant,group_name, age})
          return {user,participant,group_name, age}
        })
        .catch((error) => res.status(400).send(error)); 
      })
      .catch((error) => res.status(400).send(error)); 
    })
    .catch((error) => res.status(400).send(error)); 
  }else {
    return res.status(404).send({ message: 'uze est'})
  }
})
.catch((error) => res.status(400).send(error)); 



    /*Participant.findOne({where: {email: req.body.email}}) 
    .then(allPart => { // если такой email уже есть
      if(allPart) {
        return res.status(404).send({
          message: 'Участник с таким email уже существует!'
        });            
      } else {
        let gr_id = req.body.group_id
        Group.findByPk(gr_id)
        .then(gr => {
          let group_name = gr.title
          Participant.create({ 
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            sex: req.body.sex,
            age: req.body.age,
            heigth: req.body.heigth,
            weigth: req.body.weigth,
            group_id: req.body.group_id,
           // birthday: req.body.birthday
          })
          .then(participant => {
            let psPart = generatePassword()
            let age = getAge(participant.age)
            res.status(200).send({participant,group_name, age, psPart})
            return {participant,group_name, age}
          })
          //.catch((error) => res.status(400).send(error));
        })
      .catch((error) => res.status(400).send({error,  
        message: 'Возможно не существует такой группы!'}));
      }        
    }).catch((error) => res.status(400).send(error)); */
  },
  
  
  /*-----удалить участника группы полностью-----*/
  destroyParticipant(req, res) {
    Participant
      .findOne({
        where: {
          participant_id: req.params.participant_id
        }
      })
      .then(participant => {
        if (!participant) {              
          return res.status(404).send({
            message: 'Спортсмен не найден!',
          });
        }
        participant
          .destroy()
          .then(participant => {
            return Participant.findAll()
            .then(pt => res.status(200).send({pt,
              message: 'Спортсмен удален!',
            }))
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
    
    

    

    
      
     
 
      
     
      /*--------поиск спортсменов по имя-фамилия, во всех группах--------*/
      findParticipant(req, res) {
        return Participant
        .findAll({where: {
          name: req.body.name,
          surname: req.body.surname
        }})
          .then((user) => {
            if (user) {
              return res.status(200).send(user);              
            } else {
                return res.status(404).send({
                  message: 'Такого спортсмена нет!',
                });
              }
          })
          .catch((error) => res.status(400).send(error));
      },

      

      






      /*--------список всех групп с зависимой моделью Participant--------*/
    listGroupById(req, res) {
      /* if (!req.user) {
         return res.status(404).send({
           message: 'Авторизируйся!',
         });
       } else {*/
        Group
         .findOne({where: {group_id: req.body.group_id}})
         .then((group) => {
           if (!group) {            
            return res.status(404).send({
               message: 'Групп нет!',
             });
           }           
           res.status(200).send(group.title);
           return group.title
         })
         .catch((error) => res.status(400).send(error));
      // }
       },
}