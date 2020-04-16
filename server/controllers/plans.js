const Plan = require('../models').Plan
const Filter = require('../models').Filter
const Exercise = require('../models').Exercise
const Train = require('../models').Train
//const TrainExercise = require('../models').TrainExercise

module.exports = {
    create(req, res) {
      return Plan
        .create({
          name: req.body.name,
          filter_user_id: req.body.filter_user_id,
          exercise_id: req.body.exercise_id
        })
        .then(plan => res.status(201).send(plan))
        .catch(error => res.status(400).send(error));
    },


    createTrain(req, res) {
      return Train
        .create({
          name: req.body.name,
          from: req.body.from,
          to: req.body.to
        })
        .then(train => res.status(201).send(train))
        .catch(error => res.status(400).send(error));
    },

    listTrain(req, res) {
      return Train
        .findAll(/*{
          include: [{
            model: TrainExercise,//Exercise,
            as: 'exercisesOfTrain'
          }]
        }*/)
        .then((train) => {
          if (!train) {
            return res.status(404).send({
              message: 'Todo Not Found',
            });
          }
          return res.status(200).send(train);
        })
        .catch((error) => res.status(400).send(error));
    },

  /*  create222(req, res) {
      Plan.create({
          name: req.body.name,
          filter_user_id: req.body.filter_user_id
        }).then(plan => {
          
        }
          res.status(201).send(plan))
        .catch(error => res.status(400).send(error));
    },*/

    /*-----список групп с зависимыми моделями-----*/
    listPlan(req, res) {
      return Plan
        .findAll({
          include: [/*{
            model: Filter,
            as: 'filterPlan',
          },*/{
            model: Exercise,
            as: 'exercisePlan',
          }]
        })
        .then((plan) => {
          if (!plan) {
            return res.status(404).send({
              message: 'Todo Not Found',
            });
          }
          return res.status(200).send(plan);
        })
        .catch((error) => res.status(400).send(error));
      },

    /*  listTrainExercise(req, res) {
        return TrainExercise
          .findAll({
            include: [{
              model: Exercise,Train
            }]
          })
          .then((train) => {
            if (!train) {
              return res.status(404).send({
                message: 'Todo Not Found',
              });
            }
            return res.status(200).send(train);
          })
          .catch((error) => res.status(400).send(error));
      },*/


      createTrainExercise(req, res) {
        return Train.create({
          name: req.body.name,
          from: req.body.from,
          to: req.body.to
        }).then(trains => {
          Exercise.create({
            name: req.body.nameEx,
            approach: req.body.approach,
            duration: req.body.duration,
            count: req.body.count,
            day: req.body.day
          }).then(exercises => {
            exercises.set(trains)
          }).catch(error => res.status(400).send(error));
          res.status(201).send(trains)
        })      
        .catch(error => res.status(400).send(error));
      },

      listTEx(req, res) {
        return Train
          .findAll({
            include: [{
              model: Exercise,
              as: 'Exercises',
              through: {
                attributes: ['train_id', 'exercise_id'],
              }
            }]
          })
          .then((train) => {
            if (!train) {
              return res.status(404).send({
                message: 'Todo Not Found',
              });
            }
            return res.status(200).send(train);
          })
          .catch((error) => res.status(400).send(error));
      },

}