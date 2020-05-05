const Participant = require('../models').Participant
const Standart = require('../models').Standart
const Parameter = require('../models').Parameter
const Event = require('../models').Event
const DateTrain = require('../models').DateTrain
const DETrain = require('../models').DETrain
const Train = require('../models').Train

module.exports = {


  /*---------------СТАНДАРТ-----СТАНДАРТ-----СТАНДАРТ---------------*/

    /*--------создать стандарт--------*/
    createStandart(req, res) {
        Participant.findByPk(req.params.participant_id)
        .then(part => {
          return Standart.create({ //
                test: req.body.test,
                data: req.body.data,
                value: req.body.value,
                participant_id: req.params.participant_id
            })
            .then(standart => res.status(201).send(standart))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));        
    },
    
    /*--------список с стандартами--------*/
    listPartStandart(req, res) {
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
      return Standart
        .findOne({
          where: {
            standart_id: req.params.standart_id
          }
        })
        .then(standart => {
          if (!standart) {              
            return res.status(404).send({
              message: 'Стандарт не найден!',
            });
          }
          return standart
            .destroy()
            .then(() => res.status(200).send({
              message: 'Стандарт удален!',
            }))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },


  /*---------------ИЗМЕРЕНИЕ-----ИЗМЕРЕНИЕ-----ИЗМЕРЕНИЕ---------------*/

    /*--------создать измерение--------*/
    createParameter(req, res) {
        Participant.findByPk(req.params.participant_id)
        .then(part => {
            return Parameter.create({
                measure: req.body.measure,
                data: req.body.data,
                value: req.body.value,
                participant_id: req.params.participant_id
            })
            .then(parameter => res.status(201).send(parameter))
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
      return Parameter
        .findOne({
          where: {
            param_id: req.params.param_id
          }
        })
        .then(parameter => {
          if (!parameter) {              
            return res.status(404).send({
              message: 'Измерение не найдено!',
            });
          }
          return parameter
            .destroy()
            .then(() => res.status(200).send({
              message: 'Измерение удалено!',
            }))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
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
            .then(parameter => res.status(201).send(parameter))
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
      return Event
        .findOne({
          where: {
            event_id: req.params.event_id
          }
        })
        .then(event => {
          if (!event) {              
            return res.status(404).send({
              message: 'Событие не найдено!',
            });
          }
          return event
            .destroy()
            .then(() => res.status(200).send({
              message: 'Событие удалено!',
            }))
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