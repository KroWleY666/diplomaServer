const Event = require('../models').Event
const Group = require('../models').Group

module.exports = {

    /*--------создать событие--------*/
    create(req, res) {
        return Event.create({
            data: req.body.data,
            definition: req.body.definition
        })
        .then(event => res.status(201).send(event))
        .catch(error => res.status(400).send(error));
    },
    
    /*-------------удалить событие-------------*/
    destroyEvent(req, res) {
      return Event
        .findByPk(req.body.event_id)
        .then(event => {
          if (!event) {          
            return res.status(404).send({
              message: 'Событие не найдено!'
            });
          }
          return event
            .destroy()
            .then(() => res.status(200).send({
              message: 'Событие удалено!'
            }))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    
    /*----- список всех событий -----*/
    listEvent(req, res) {
      return Event
        .findAll({
          include: [{
            model: Group,
            as: 'groups'
          }]
        })
        .then((event) => {
          if (!event) {
            return res.status(404).send({
              message: 'Событий нет!',
            });
          }
          return res.status(200).send(event);
        })
        .catch((error) => res.status(400).send(error));
      },

    /*---------добавить в группу событие---------*/
    addEventToGroup(req, res) {
        Event.findOne({where: {event_id: req.body.event_id}}) //return
        .then(newEvent => {
              var eventToAdd = newEvent;
              Group.findOne({ where: { group_id: req.body.group_id } }) //return
        .then(group => {
            group.addEvent(eventToAdd) //return
                .then(function(ans){
                  res.status(201).send(eventToAdd)
                  return eventToAdd;//return
                })
                .catch((error) => res.status(400).send(error));
              })
        .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
    }  
}