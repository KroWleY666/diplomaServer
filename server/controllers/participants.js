const Participant = require('../models').Participant
const Standart = require('../models').Standart
const Parameter = require('../models').Parameter

module.exports = {

    /*--------создать стандарт--------*/
    createStandart(req, res) {
        Participant.findByPk(req.body.participant_id)
        .then(part => {
            return Standart.create({
                test: req.body.test,
                data: req.body.data,
                value: req.body.value,
                participant_id: req.body.participant_id
            })
            .then(standart => res.status(201).send(standart))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));        
    },

    /*--------создать измерение--------*/
    createParameter(req, res) {
        Participant.findByPk(req.body.participant_id)
        .then(part => {
            return Parameter.create({
                measure: req.body.measure,
                data: req.body.data,
                value: req.body.value,
                participant_id: req.body.participant_id
            })
            .then(parameter => res.status(201).send(parameter))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));        
    },
    
    /*-----удалить стандарт-----*/
    destroyStandart(req, res) {
      return Standart
        .findOne({
          where: {
            standart_id: req.body.standart_id
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
    
    /*-----удалить измерение-----*/
    destroyParameter(req, res) {
      return Parameter
        .findOne({
          where: {
            param_id: req.body.param_id
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

    /*--------список спортсменов с стандартами,измерениями--------*/
    listONEPartModels(req, res) {
      /*if (!req.user) {
        return res.status(404).send({
          message: 'Авторизируйся!',
        });
      } else {*/
      return Participant
        .findOne({ where: {participant_id: req.params.participant_id},
        //  where: {participant_id: req.body.participant_id},
          include: [{
            model: Standart,
            as: 'standarts',
          },{
            model: Parameter,
            as: 'parameters',
          }],
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