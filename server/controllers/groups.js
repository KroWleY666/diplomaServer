const Group = require('../models').Group
const User = require('../models').User
const Participant = require('../models').Participant
const Event = require('../models').Event

module.exports = {

    /*--------создать группу--------*/
    create(req, res) {
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
            return Group.create({
              title: req.body.title,
              //sport: req.body.sport,
              user_id: req.params.userId
            })
            .then(group => res.status(201).send(group))
            .catch(error => res.status(400).send(error));
          }
        })
        .catch(error => res.status(400).send(error));
    },

    /*--------список всех групп с зависимой моделью Participant--------*/
    list(req, res) {
     /* if (!req.user) {
        return res.status(404).send({
          message: 'Авторизируйся!',
        });
      } else {*/
      return Group
        .findAll({
         // where: {user_id: req.user.user_id},
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
     // }
      },
 
      /*--------добавить спортсмена в группу--------*/
      addParticipant(req, res) {  
        Participant.findOne({where: {email: req.body.email}}) 
        .then((allPart) => {
          // если такой email уже есть
          if(allPart) {
            return res.status(404).send({
              message: 'Участник с таким email уже существует!'
            });            
          } else {
            //allPart.age  
            return Participant.create({ 
              name: req.body.name,
              surname: req.body.surname,
              email: req.body.email,
              sex: req.body.sex,
              age: req.body.age,
              heigth: req.body.heigth,
              weigth: req.body.weigth,
              group_id: req.body.group_id
          })
          .then((participant) => {
            //Group.findOne({where: {group_id: req.params.group_id}}) 
           // return
            res.status(200).send(participant)
          })
          .catch((error) => res.status(400).send(error));
          }        
        }).catch((error) => res.status(400).send(error)); 
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

      /*-----удалить участника группы полностью-----*/
      destroyParticipant(req, res) {
        return Participant
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
            return participant
              .destroy()
              .then(() => res.status(200).send({
                message: 'Спортсмен удален!',
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },

      /*-----удалить группу с участниками-----*/
      destroyGroup(req, res) {
        return Group
          .findOne({
            where: {
              group_id: req.params.group_id
            }
          })
          .then(group => {
            if (!group) {              
              return res.status(404).send({
                message: 'Группа не найдена!',
              });
            }
            return group
              .destroy()
              .then(() => res.status(200).send({
                message: 'Группа удалена!',
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
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