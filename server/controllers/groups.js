const Group = require('../models').Group
const User = require('../models').User
const Participant = require('../models').Participant
const Event = require('../models').Event

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
            group_id: req.body.group_id
          })
          .then(participant => {
            res.status(200).send({participant,group_name})
            return {participant,group_name}
          })
          .catch((error) => res.status(400).send(error));
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