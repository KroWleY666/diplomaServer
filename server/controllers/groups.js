const Group = require('../models').Group
const User = require('../models').User
const Participant = require('../models').Participant

module.exports = {
    /*-----создать группу-----*/
    create(req, res) {
      return Group
        .create({
          title: req.body.title,
          sport: req.body.sport
        })
        .then(group => res.status(201).send(group))
        .catch(error => res.status(400).send(error));
    },
    /*-----список всех групп с user-----*/
    list(req, res) {
      return Group
        .findAll({
          include: [{
            model: User,
            as: 'userGroup',
          }],
        })//findByPk(req.params.group_id)
        .then((group) => {
          if (!group) {
            return res.status(404).send({
              message: 'Todo Not Found',
            });
          }
          return res.status(200).send(group);
        })
        .catch((error) => res.status(400).send(error));
      },

      addParticipant(req, res) {     

        return User.findOne({where: 
          {role: 'Спортсмен', name: req.body.name}})
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'Todo Not Found',
              });
            }
            else {
              return user
                .update({ 
                  group_id: req.body.group_id || user.group_id})
              
                .then(() => res.status(200).send(user))
              .catch((error) => res.status(400).send(error)); 
            }
          })
          .catch((error) => res.status(400).send(error));
      },

      /*-----список групп с зависимыми моделями-----*/
      listParticipant(req, res) {
        return Group
          .findAll({
            include: [{
              model: Participant,
              as: 'groupParticipants',
            },{
              model: User,
              as: 'userGroup',
            }]
          })
          .then((group) => {
            if (!group) {
              return res.status(404).send({
                message: 'Todo Not Found',
              });
            }
            return res.status(200).send(group);
          })
          .catch((error) => res.status(400).send(error));
        },
  
      /*-----добавить участников (БЕЗ РОЛИ)-----*/
      addParticipant222(req, res) {     
        return Participant
        .create({ 
           name: req.body.name,
           surname: req.body.surname,
           email: req.body.email,
           group_id: req.body.group_id
          })
        .then((participant) => res.status(200).send(participant))        
        .catch((error) => res.status(400).send(error)); 
      },

      /*-----поиск участников с РОЛЬЮ-----*/
      findParticipant(req, res) {
        return User
        .findAll({where: {role: 'Спортсмен'}})
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'Todo Not Found',
              });
            }
            return res.status(200).send(user);
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