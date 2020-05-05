const Event = require('../models').Event
const Group = require('../models').Group
const Participant = require('../models').Participant
const GroupEvent = require('../models').GroupEvent

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
    
    /*---------добавить событие в группу---------*/
    addEventToGroup(req, res) {     
      Event.findOne({where: {
        data: req.body.data,
        definition: req.body.definition
      }}).then(oneEv => {
        if(!oneEv) {
          return Event.create({
            data: req.body.data,
            definition: req.body.definition
          })
          .then(event => {
            var newEvent = event;
            Group.findOne({where: {group_id: req.body.group_id}})  //return
              .then(newGroup => {
                if(newGroup) {
                newGroup.addEvent(newEvent) //return
                  .then(function(ans){
                    res.status(201).send(newEvent)
                    newEvent;//return
                  })                
              } else {
                res.status(404).send({
                  message: 'Группа не найдена!'
                });
              }
              })
              .catch((error) => res.status(400).send(error));           
          })
        }
        else {
          res.status(404).send({
            message: 'Событие уже существует!'
          });
        }
      })
    },    
    
    /*-------------удалить событие-------------*/
    destroyEvent(req, res) {
      return Event
        .findByPk(req.params.event_id)
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
      
      /*----- список событий для ОДНОГО спортсмена -----*/
      /*----- !!!!!!!!!!ПОКА ПРОБУЕМ ЭТО!!!!!!!!!! -----*/
      listParticEvent(req, res) {
        return Group.findOne({where: {group_id: req.params.group_id},        
        include: [{
          model: Event,
         // through: GroupEvent,
          as: 'events'
        }]
        //attribute: ['events']
      })             
        .then(group => {    
          if (!group) {
            return res.status(404).send({
              message: 'Группы нет!',
            });
          }     
          res.status(200).send(group);   
        }) .catch((error) => res.status(400).send(error));
      }, 
      
      /*----- список событий для ОДНОГО спортсмена -----*/
      reternEventsOfGroup(req, res) {
        Group.findOne({where: {group_id: req.params.group_id},        
        include: [{
          model: Event,
         // through: GroupEvent,
          as: 'events'
        }]
      })             
        .then(group => {    
          if (!group) {
            return res.status(404).send({
              message: 'Группы нет!',
            });
          } 
          Event.findAll({
            include: [{
              model: Group,
              where: {group_id: req.params.group_id}
             // through: GroupEvent,
              //as: 'events'
            }]
          })   .then(event => {  res.status(200).send(event); })   
          res.status(200).send(group);   
        }) .catch((error) => res.status(400).send(error));
      }, 
      
      /*----- список событий для ОДНОГО спортсмена -----*/
      reternEventsOfGroup222(req, res) {
        GroupEvent.findAll({where: {group_id: req.params.group_id}})    
        .then(event => {  res.status(200).send(event); })   
        .catch((error) => res.status(400).send(error));
      },
      
      /*----- список событий для ОДНОГО спортсмена -----*/
      listParticEvent222(req, res) {
        return Group.findByPk(req.params.group_id)             
        .then(group => {    
          if (!group) {
            return res.status(404).send({
              message: 'Группы нет!',
            });
          }     
          Event.findAll()  
            .then((event) => {
             // console.log(`${event}`)
              if (!event) {
                return res.status(404).send({
                  message: 'Событий нет!',
                });
              }              
              var t = group.getEvents(event)//.findAll({where: {group_id: req.params.group_id}}))
             //event.get(group)
             console.log(`${event}`)
              res.status(200).send(t);
             // return 
            })
        }) .catch((error) => res.status(400).send(error));
      }
  }
