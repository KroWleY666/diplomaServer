const DateTrain = require('../models').DateTrain
const Train = require('../models').Train
const Participant = require('../models').Participant

module.exports = {

    /*----------создать дату для тренировки----------*/
    create(req, res) {
      Participant.findOne({where: {participant_id: req.params.participant_id}})
        .then(part => {
      DateTrain.create({
            from: req.body.from,
            to: req.body.to,
            participant_id: req.params.participant_id
        }) //return
        .then(newDT => {
            var DTtoAdd = newDT;
            Train.findOne({ where: { train_id: req.body.train_id } }) //return
        .then(train => {            
            if(train) {                
                train.addDate(DTtoAdd) //return
               // console.log(`${train.train_id}`)
                .then(function(ans){
                    res.status(201).send(DTtoAdd)
                   // console.log(`${DTtoAdd.train_id}`)
                    return DTtoAdd;//return
                })
              .catch((error) => res.status(400).send(error));
            } else {
                return res.status(404).send({
                    message: 'Тренировка не найдена!',
                });
            }           
        })
        .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
    },
    
    /*-----ИЗМЕНИТЬ даты в тренировке-----*/
    updateDateTrain(req, res) {
        Train
        .findByPk(req.body.train_id)
        .then(datetrain => {
          if (!datetrain) {          
            return res.status(404).send({
              message: 'Тренировки нет!'
            });
          }
          DateTrain.findOne({ where: { dt_id: req.body.dt_id } })
          .then(datetrain => {
            datetrain.update({
                from: req.body.from || datetrain.from,
                to: req.body.to || datetrain.to
            }).then(newDate => {
                newDate.set
                res.status(200).send(datetrain)
            })
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));


      /*  DateTrain.findOne({ where: { dt_id: req.body.dt_id } })
        .then(datetrain => {
          datetrain.update({
              from: req.body.from || datetrain.from,
              to: req.body.to || datetrain.to
          }).then(newDate => {
              newDate.set
              res.status(200).send(datetrain)
          })
*/

    },

    /*-----удалить даты в тренировке-----*/
  destroyDateTrain(req, res) {
    return DateTrain
      .findByPk(req.body.dt_id)
      .then(datetrain => {
        if (!datetrain) {          
          return res.status(404).send({
            message: 'Даты не выставлены!'
          });
        }
        return datetrain
          .destroy()
          .then(() => res.status(200).send({
            message: 'Даты удалены!'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
}