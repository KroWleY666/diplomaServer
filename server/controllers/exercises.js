const Exercise = require('../models').Exercise
const Train = require('../models').Train

module.exports = {

    /*----- добавить упражнение -----*/
    create(req, res) {
      Exercise.findOne({where: {name: req.body.name}})
      .then(ex => {
        if(ex) {
          return res.status(404).send({
          message: 'Упражнение уже существует!',
        })
      } else {
        return Exercise
        .create({
          name: req.body.name,
          approach: req.body.approach,
          duration: req.body.duration,
          count: req.body.count
        })
        .then(exercise => res.status(201).send(exercise))
        .catch(error => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));      
    },

    /*----- список всех упражнений -----*/
    listExercise(req, res) {
      return Exercise
        .findAll({
          include: [{
            model: Train,
            as: 'trains'
          }]
        })
        .then((exercise) => {
          if (!exercise) {
            return res.status(404).send({
              message: 'Упражнений нет!',
            });
          }
          return res.status(200).send(exercise);
        })
        .catch((error) => res.status(400).send(error));
      },

    /*---------добавить в тренировку упражнение---------*/
    addExerciseToTrain(req, res) {
      Exercise.findOne({ where: { exercise_id: req.body.exercise_id } }) //return
      .then(newExercise => {
            var exerciseToAdd = newExercise;
            Train.findOne({ where: { train_id: req.body.train_id } }) //return
      .then(train => {
              train.addExercise(exerciseToAdd) //return
              .then(function(ans){
                res.status(201).send(exerciseToAdd)
                return exerciseToAdd;//return
              })
              .catch((error) => res.status(400).send(error));
            })
      .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
  },

  /*-----удалить упражнение-----*/
  destroyExercise(req, res) {
    return Exercise
      .findByPk(req.body.exercise_id)
      .then(exercise => {
        if (!exercise) {          
          return res.status(404).send({
            message: 'Упражнение не найдено!'
          });
        }
        return exercise
          .destroy()
          .then(() => res.status(200).send({
            message: 'Упражнение удалено!'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /*----- информация об одном упражнении -----*/
  oneExercise(req, res) {
    return Exercise
      .findOne({ where: {exercise_id: req.body.exercise_id}})
      .then((exercise) => {
        if (!exercise) {
          return res.status(404).send({
            message: 'Упражнений нет!',
          });
        }
        return res.status(200).send(exercise);
      })
      .catch((error) => res.status(400).send(error));
    },

    
}