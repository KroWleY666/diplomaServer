const Participant = require('../models').Participant
const Standart = require('../models').Standart
const Parameter = require('../models').Parameter
const Event = require('../models').Event
const DateTrain = require('../models').DateTrain
const DETrain = require('../models').DETrain
const Train = require('../models').Train

const StandName = require('../models').StandName

module.exports = {

  /*---------------СТАНДАРТ-----СТАНДАРТ-----СТАНДАРТ---------------*/
  
  /*--------создать стандарт--------*/
  createStandart(req, res) {
    Participant.findByPk(req.params.participant_id)
    .then(part => {
      Standart.create({
        stn_id: req.body.stn_id,
        data: req.body.data,
        value: req.body.value,
        participant_id: req.params.participant_id
      })
      .then(standart => {
        return Standart.findAll({where: {participant_id: req.params.participant_id}})
          .then((part) => res.status(200).send(part))
          .catch((error) => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));  
    })
    .catch(error => res.status(400).send(error));        
  },
  
  /*--------список с стандартами--------*/
  listStandarts(req, res) {
    return StandName.findAll()
      .then((part) => {
        if (!part) {
          return res.status(404).send({
            message: 'Стандартов нет!',
          });
        }
        return res.status(200).send(part);
      })
      .catch((error) => res.status(400).send(error));
  },
  
  /*--------список с стандартами--------*/
  listPartStandart(req, res) {
    let name = []
    let standart = {}
    //  Standart.findAll({ where: {participant_id: req.params.participant_id}})
    //  .then(st => { // console.log(`${st.length}`)
     /*   for (let i in st)
        {            
          //console.log(`${st[i].standart_id}`)
          StandName.findByPk(st[i].stn_id)
          .then(sn => {
            name[i] = sn.name
            //console.log(`${name[i]}`)
           // console.log(`${mas}`)
           standart = {standarts: [
             st[i].standart_id,
             st[i].data, 
             st[i].value
           ], 
            name: name[i]
          }
         
            console.log(`${standart.standarts}`)
          })
        }
        return res.status(200).send(standart);

      })
      */
     // .catch((error) => res.status(400).send(error));
      
    return Standart
      .findAll({ where: {participant_id: req.params.participant_id}
      })
      .then((part) => {
        if (!part) {
          return res.status(404).send({
            message: 'Стандартов нет!',
          });
        }
        return res.status(200).send(part);
      })
      .catch((error) => res.status(400).send(error));
  },
  
  /*-----удалить стандарт-----*/
  destroyStandart(req, res) {
    Standart.findOne({ where: {standart_id: req.params.standart_id}})
      .then(standart => {
        if (!standart) {              
          return res.status(404).send({
            message: 'Стандарт не найден!',
          });
        }
        standart.destroy()
          .then((st) => {
            return Standart.findAll({where: {participant_id: req.params.participant_id}})
              .then((part) => {
                res.status(200).send({part,message: 'Стандарт удален!'})})
              .catch((error) => res.status(400).send(error))
            })
          .catch(error => res.status(400).send(error));
        })
      .catch(error => res.status(400).send(error));
  },

    
    

  /*---------------ИЗМЕРЕНИЕ-----ИЗМЕРЕНИЕ-----ИЗМЕРЕНИЕ---------------*/

  /*--------создать измерение--------*/
  createParameter(req, res) {
    Participant.findByPk(req.params.participant_id)
    .then(part => {
      Parameter.create({
        measure: req.body.measure,
        data: req.body.data,
        value: req.body.value,
        participant_id: req.params.participant_id
      })
      .then(parameter => {
        return Parameter.findAll({ where: {participant_id: req.params.participant_id}})
          .then(part => res.status(200).send(part))
          .catch((error) => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));  
    })
    .catch(error => res.status(400).send(error));        
  },
  
  /*--------список с измерениями--------*/
  listPartParameter(req, res) {
    return Parameter
      .findAll({ where: {participant_id: req.params.participant_id}
      })
      .then((part) => {
        if (!part) {
          return res.status(404).send({
            message: 'Параметров нет!',
          });
        }
        return res.status(200).send(part);
      })
      .catch((error) => res.status(400).send(error));
  }, 
  
  /*-----удалить измерение-----*/
  destroyParameter(req, res) {
    return Parameter.findOne({ where: { param_id: req.params.param_id}})
      .then(parameter => {
        if (!parameter) {              
          return res.status(404).send({
            message: 'Измерение не найдено!',
          });
        }
        parameter.destroy()
          .then((par) => {
            return Parameter.findAll({ where: {participant_id: req.params.participant_id}})
              .then(part => res.status(200).send({part, message: 'Измерение удалено!'}))
            })
              .catch((error) => res.status(400).send(error))
        })
        .catch(error => res.status(400).send(error))
  },  
    
    

    
    
  /*---------------СОБЫТИЕ-----СОБЫТИЕ-----СОБЫТИЕ---------------*/

  /*--------создать событие спортсмену--------*/
  createEvent(req, res) {
    Participant.findByPk(req.params.participant_id)
    .then(part => {
      return Event.create({
        data: req.body.data,
        definition: req.body.definition,
        participant_id: req.params.participant_id
      })
      .then(parameter => {
        return Event.findAll({ where: {participant_id: req.params.participant_id}})
          .then((part) => res.status(200).send(part))
          .catch((error) => res.status(400).send(error))
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));        
  },
  
  /*--------список с событиями--------*/
  listPartEvent(req, res) {
    return Event
      .findAll({ where: {participant_id: req.params.participant_id}
      })
      .then((part) => {
        if (!part) {
          return res.status(404).send({
            message: 'Событий нет!',
          });
        }
        return res.status(200).send(part);
      })
      .catch((error) => res.status(400).send(error));
  },
  
  /*-----удалить событие-----*/
  destroyEvent(req, res) {
    return Event.findOne({ where: {event_id: req.params.event_id}})
      .then(event => {
        if (!event) {              
          return res.status(404).send({
            message: 'Событие не найдено!',
          });
        }
        return event
          .destroy()
          .then(() => {
            return Event.findAll({ where: {participant_id: req.params.participant_id}})
              .then((part) => res.status(200).send({part, message: 'Событие удалено!'}))
              .catch((error) => res.status(400).send(error))
            })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
    
    
    
    
    





  

    /*--------список спортсменов с стандартами,измерениями--------*/
    listONEPartModels(req, res) {
      return Participant
        .findOne({ where: {participant_id: req.params.participant_id},
        //  where: {participant_id: req.body.participant_id},
          include: [{
            model: Standart,
            as: 'standarts',
          },{
            model: Parameter,
            as: 'parameters',
          },
          {
            model: Event,
            as: 'events',
          },
          {
            model: DateTrain,
            as: 'datesOfTrain',
          }]
        })
        .then((part) => {
          if (!part) {
            return res.status(404).send({
              message: 'Участников нет!',
            });
          }
          return res.status(200).send(part);
        })
        .catch((error) => res.status(400).send(error));
      },
      
      /*--------список спортсменов с стандартами,измерениями--------*/
      listPartDates(req, res) {
        return DateTrain
          .findAll({ where: {participant_id: req.params.participant_id}})
          .then((part) => {
            if (!part) {
              return res.status(404).send({
                message: 'Дат тренировок (записей) нет!',
              });
            }
            return res.status(200).send(part);
          })
          .catch((error) => res.status(400).send(error));
        },      
      
     /*--------список ВСЕХ спортсменов и их групп--------*/
     listPartWithGroup(req, res) {
      /*if (!req.user) {
        return res.status(404).send({
          message: 'Авторизируйся!',
        });
      } else {*/
      return Participant
        .findAll()
        .then((part) => {
          if (!part) {
            return res.status(404).send({
              message: 'Участников нет!',
            });
          }
          return res.status(200).send(part);
        })
        .catch((error) => res.status(400).send(error));
      }     
}