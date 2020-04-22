const Exercise = require('../models').Exercise
const Train = require('../models').Train
const Character = require('../models').Character

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
          definition: req.body.definition
        })
        .then(exercise => res.status(201).send(exercise))
        .catch(error => res.status(400).send(error));
          /*Character
            .create({
              approach: req.body.approach,
              duration: req.body.duration,
              count: req.body.count
            })
            .then(character => {*/
             // exercise.addCharacter(character)   
           //   res.status(201).send(exercise)           
          //  })
       //   res.status(201).send(exercise)
      //  })          
     //   .catch(error => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));      
    },
    
    /*----- список только упражнений -----*/
    listOnlyExercise(req, res) {
      return Exercise
      .findAll({
       // attributes: ['name', 'definition']//,'count','duration','approach'
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
    
    /*----- добавить упражнение -----*/
    addCharToExer(req, res) {
      Exercise.findOne({where: {exercise_id: req.body.exercise_id}})
      .then(ex => {
        if(!ex) {
          return res.status(404).send({
          message: 'Упражнение не найдено!',
        })
      } else {
       Character.findOne({where: {
          approach: req.body.approach,
          duration: req.body.duration,
          count: req.body.count
        }})
        .then(char => {
          if(!char) {
            return Character
            .create({
              approach: req.body.approach,
              duration: req.body.duration,
              count: req.body.count
            })
            .then(character =>  {
              ex.addCharacter(character)
              res.status(201).send(character)
            })
          }else {
            ex.addCharacter(char)
            res.status(201).send(char)
          }
        })       
        .catch(error => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));      
    },

    /*----- список всех упражнений -----*/
    listExercise(req, res) {
      return Exercise
        .findAll({
         // attributes: ['name', 'definition'],//,'count','duration','approach'
          include: [{
            model: Train,
            as: 'trains'
          },
          {
            model: Character,
            as: 'characters'
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
                exerciseToAdd;//return
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
        res.status(200).send(exercise);//return
        return exercise
      })
      .catch((error) => res.status(400).send(error));
    }    
}