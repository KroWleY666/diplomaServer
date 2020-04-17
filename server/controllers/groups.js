const Group = require('../models').Group
const User = require('../models').User
const Participant = require('../models').Participant

module.exports = {

    /*--------создать группу--------*/
    create(req, res) {
      // если группа вообще существует, не только у конкретного пользователя
      Group.findOne({where: {
        title: req.body.title,
        sport: req.body.sport
      }}).then(group => 
        {
          if(group) {
            return res.status(404).send({
              message: 'Такая группа уже существует!'
            }); 
          } else {
            return Group.create({
              title: req.body.title,
              sport: req.body.sport,
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
      return Group
        .findAll({
          where: {user_id: req.params.userId},
          include: [{
            model: Participant,
            as: 'groupParticipants',
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
            return Participant.create({ 
              name: req.body.name,
              surname: req.body.surname,
              email: req.body.email,
              group_id: req.params.group_id
          })
          .then((participant) => res.status(200).send(participant))
          .catch((error) => res.status(400).send(error));
          }        
        }).catch((error) => res.status(400).send(error)); 
      },
     
      /*--------поиск спортсменов по имя-фамилия, во всех группах--------*/
      findParticipant(req, res) {
        return Participant
        .findAll({where: {
          name: req.body.name,
          surname: req.body.surname,
          //group_id: req.body.group_id
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
              participant_id: req.body.participant_id,
              group_id: req.body.group_id,
            },
          })
          .then(participant => {
            if (!participant) {
              
              return res.status(404).send({
                message: 'TodoItem Not Found',
              });
            }
            return participant
              .destroy()
              .then(() => res.status(204).send())
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
}