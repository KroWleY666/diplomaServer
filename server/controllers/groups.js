const Group = require('../models').Group
const User = require('../models').User
const Participant = require('../models').Participant
const Event = require('../models').Event

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


module.exports = {

  /*--------добавление/просмотр/удаление ТОЛЬКО ГРУПП--------*/

  /*--------создать группу--------*/
  createGroup(req, res) {
    // если группа вообще существует, не только у конкретного пользователя
    Group.findOne({where: {
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
      .catch(error => res.status(400).send(error));
  },
  
  /*--------список всех групп с зависимой моделью Participant--------*/
  listGroups(req, res) {
    return Group
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
    .catch((error) => res.status(400).send(error));
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
  addParticipant(req, res) {  
    Participant.findOne({where: {email: req.body.email}}) 
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
            let age = getAge(participant.age)
            res.status(200).send({participant,group_name, age})
            return {participant,group_name, age}
          })
          //.catch((error) => res.status(400).send(error));
        })
      .catch((error) => res.status(400).send({error,  
        message: 'Возможно не существует такой группы!'}));
      }        
    }).catch((error) => res.status(400).send(error)); 
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