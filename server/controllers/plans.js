const Plan = require('../models').Plan
const Filter = require('../models').Filter
const Exercise = require('../models').Exercise
const Train = require('../models').Train
const DateTrain = require('../models').DateTrain

module.exports = {

    /*----------создать отдельно план----------*/
    create(req, res) {
      Plan.findOne({where: {name: req.body.name}})
      .then(plan => {
        if(plan) {
          return res.status(404).send({
            message: 'План уже существует!',
          })
        } else {
          return Plan
          .create({
            name: req.body.name
          })
          .then(plan => res.status(201).send(plan))
          .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));     
    },

    

    
    /*-----список планов с зависимыми моделями-----*/
listPlan(req, res) {
  return Plan
    .findAll({
      include: [{
        model: Filter,
        as: 'filters',
      },{
        model: Train,
        as: 'trains',
      }]
      })
    .then((plan) => {
      if (!plan) {
        return res.status(404).send({
          message: 'Планов нет!',
        });
      }
      return res.status(200).send(plan);
    })
    .catch((error) => res.status(400).send(error));
  },

    /*---------добавить в план тренировку---------*/
    addTrainToPlan(req, res) {
      Train.findAll({where: {train_id: req.body.train_id}}) //return
      .then(newTrain => {
            var trainToAdd = newTrain;
            Plan.findOne({ where: { plan_id: req.body.plan_id } }) //return
      .then(plan => {
              plan.addTrain(trainToAdd) //return
              .then(function(ans){
                res.status(201).send(trainToAdd)
                trainToAdd;//return
              })
              .catch((error) => res.status(400).send(error));
            })
      .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
  },

  

    /*-----удалить план-----*/
    destroyPlan(req, res) {
      return Plan
        .findByPk(req.params.plan_id)
        .then(plan => {
          if (!plan) {          
            return res.status(404).send({
              message: 'План не найден!'
            });
          }
          return plan
            .destroy()
            .then(() => res.status(200).send({
              message: 'План удален!'
            }))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },

}