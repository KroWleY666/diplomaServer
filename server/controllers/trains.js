const DateTrain = require('../models').DateTrain
const Train = require('../models').Train
const Exercise = require('../models').Exercise
const Participant = require('../models').Participant
const TrainExercise = require('../models').TrainExercise

module.exports = {

    /*----------создать дату для тренировки----------*/
    /*create(req, res) {
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
    },*/ 
    
    /*-----тренировки из даты-----*/
    listTrainWithExercise(req, res) {
      TrainExercise
        .findAll({where: {train_id: req.params.train_id},
          attributes: ['exercise_id']
        })
        .then(train => {
          if (!train) {          
            return res.status(404).send({
              message: 'Тренировки нет!'
            });
          }
          return res.status(200).send(train);        
        })
        .catch(error => res.status(400).send(error));
      }, 
      
      /*-----тренировки из даты-----*/
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
    
    /*----------создать дату для тренировки----------*/
    createDT(req, res) {
        DateTrain.findOne({where: {
          from: req.body.from,
          to: req.body.to,
          title: req.body.title,
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
          }})
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
  
  
  /*-----тренировки из даты-----*/
  /*listTrainsFromOneData(req, res) {
    DateTrain
      .findAll({where: {participant_id: req.params.participant_id}})
      .then(datetrain => {
        if (!datetrain) {          
          return res.status(404).send({
            message: 'Тренировки нет!'
          });
        }
        Train
        .findAll()
        .then(train => {
          train.getDates(datetrain) //??????????????
        return res.status(200).send(datetrain);        
      })
    //  .catch(error => res.status(400).send(error));
    })
   // .catch(error => res.status(400).send(error));
  },*/
}