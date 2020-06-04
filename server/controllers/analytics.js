const Participant = require('../models').Participant
const Standart = require('../models').Standart
const Parameter = require('../models').Parameter

module.exports = {
    
    /*--------извлечь НОРМАТИВ--------*/
    extractStandart(req, res) {
      Participant.findByPk(req.params.participant_id)
      .then(part => {
        Standart.findAll({ where: {
            participant_id: req.params.participant_id,
            stn_id: req.params.stn_id
        }, attributes: [ 'data', 'value']}) // return moment.utc(this.getDataValue('data')).format('%d-%m-%Y');//DD-MM-YYYY
        .then(standart => {return res.status(200).send({standart, message: 'Поиск прошел учпешно!'})})
        .catch((error) => res.status(400).send({error, message: 'Поиск провалился!'}))
    })
    .catch(error => res.status(400).send(error));        
    },
    
    /*--------извлечь ПАРАМЕТР--------*/
    extractParameter(req, res) {
        Participant.findByPk(req.params.participant_id)
        .then(part => {
            Parameter.findAll({ where: {
              participant_id: req.params.participant_id,
              pn_id: req.params.pn_id
          }, attributes: ['data', 'value']})
          .then(standart => {return res.status(200).send({standart, message: 'Поиск прошел учпешно!'})})
          .catch(error => res.status(400).send({error, message: 'Параметр не найден!'}))
        })
      .catch(error => res.status(400).send(error));        
    }
}  