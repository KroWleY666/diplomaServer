const DateTrain = require('../models').DateTrain
const Train = require('../models').Train
const Exercise = require('../models').Exercise
const Participant = require('../models').Participant
const TrainExercise = require('../models').TrainExercise

module.exports = {

  /********************* ТРЕНИРОВКИ/УПРАЖНЕНИЯ *********************/
    
    /*----------создать отдельно тренировку----------*/
    createTrain(req, res) {
      Train.findOne({where : {name: req.body.name}})
      .then(tr => {
        if(tr) {
          return res.status(404).send({
            message: 'Тренировка уже существует!',
          })
        }else {
          return Train
          .create({
            name: req.body.name,
          //  type: req.body.type,
            duration: req.body.duration,
            //level: req.body.level,
            definition: req.body.definition
          })
          .then(train => res.status(201).send(train))   
          .catch(error => res.status(400).send(error)); 
        }
      })      
      .catch(error => res.status(400).send(error));
    },
    
    /*----------список тренировок----------*/
    listTrain(req, res) {
      return Train
        .findAll()
        .then((train) => {
          if (!train) {
            return res.status(404).send({
              message: 'Тренировки не найдены!',
            });
          }
          return res.status(200).send(train);
        })
        .catch((error) => res.status(400).send(error));
    },
    
    /*----------вывод инфы об ОДНОЙ тренировке и ее упражнений----------*/
    listOneTrain(req, res) {
      return Train
        .findOne({ where: {train_id: train_id.params.train_id},
          include: [{
            model: Exercise,
            as: 'exercises'
          }/*,{
            model: DateTrain,
            as: 'dates'
          }*/]
        })
        .then((train) => {
          if (!train) {
            return res.status(404).send({
              message: 'Тренировка не найдена!',
            });
          }
          return res.status(200).send(train);
        })
        .catch((error) => res.status(400).send(error));
    },
    
    /*-----вся инфа об упражнениях тренировки-----*/
    allTrainExercisesInfo(req, res) {
      Train.findOne({where: {train_id: req.params.train_id}})
        .then(train=>{
          if (!train) {          
            return res.status(404).send({
              message: 'Тренировки нет!'
            })
          }
          train.getExercises().then(ex => {
            for(exer of ex){          
              console.log("exercise:", exer.name);                
            }
            return res.status(200).send(ex)
          })
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
    },

    /*-----список тренировоктренировки из даты-----*/
    listTrainWithExercise(req, res) {
      TrainExercise
        .destroy({where: {train_id: req.body.train_id}})
        /*({where: {train_id: req.params.train_id},
          attributes: ['exercise_id']
        })*/
        .then(train => {
          if (!train) {          
            return res.status(404).send({
              message: 'Тренировки нет!'
            });
          }
          return res.status(201).send(train);        
        })
        .catch(error => res.status(400).send(error));
      }, 
      
      /*-----удалить тренировку-----*/
      destroyTrain(req, res) {
        return Train
          .findByPk(req.params.train_id)
          .then(train => {
            if (!train) {          
              return res.status(404).send({
                message: 'Тренировка не найдена!'
              });
            }
            return train
              .destroy()
              .then(() => res.status(200).send({
                message: 'Тренировка удалена!'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
  
      
  /********************* ТРЕНИРОВКИ/ДАТЫ *********************/
 
    /*----------создать дату для тренировки----------*/
    createDT(req, res) {
        DateTrain.findOne({where: {
          from: req.body.from,
          to: req.body.to,
          title: req.body.title, //train_id
          type: req.body.type,
          participant_id: req.params.participant_id
        }}).then(nDT => {
          if(!nDT) {
            DateTrain.create({
              from: req.body.from,
              to: req.body.to,
              title: req.body.title,
              type: req.body.type,
              participant_id: req.params.participant_id
            }).then(newDT => {
              var DTtoAdd = newDT;
              Train.findOne({ where: { train_id: req.body.train_id } }) //return
                .then(train => {   
                  res.status(201).send(DTtoAdd)            
                  train.addDate(DTtoAdd)
                  return DTtoAdd
              })
              .catch((error) => res.status(400).send(error))
            })
          } else {
            Train.findOne({ where: { train_id: req.body.train_id } }) //return
              .then(train => {      
                res.status(201).send(nDT)          
                train.addDate(nDT)     
                return nDT          
            })
            .catch((error) => res.status(400).send(error));
          }
        })
        .catch((error) => res.status(400).send(error));
    },
    
    /*-----вся инфа об датах тренировок одного спортсмена-----*/
    allDateTrainsInfo(req, res) {
      DateTrain.findOne({where: {participant_id: req.params.participant_id}})
        .then(dt=>{
          if (!dt) {          
            return res.status(404).send({
              message: 'Тренировки нет!'
            })
          }
          dt.getTrains().then(ex => {
            for(exer of ex){          
              console.log("exercise:", exer.name);                
            }
            return res.status(200).send(ex)
          })
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
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
    },
}