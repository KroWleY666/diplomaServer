const Exercise = require('../models').Exercise
const Train = require('../models').Train
const Character = require('../models').Character
const ExercParam = require('../models').ExercParam
const Muscle = require('../models').Muscle
const TypeEx = require('../models').TypeEx
const CharEx = require('../models').CharEx
const FilterPlan = require('../models').FilterPlan
const PlanTrain = require('../models').PlanTrain

module.exports = {
  
  /*----- добавить упражнение с его типом и мышцами -----*/
  createExercise(req, res) {                                  //ТЕЕЕЕЕЕЕЕСТ
    Exercise.findOne({where: {name: req.body.name}})
    .then(ex => {
      if(ex) {
        return res.status(404).send({
        message: 'Упражнение уже существует!',
      })
    } else {
      ExercParam.findOne({where: {
        te_id: req.body.type, //te_id
        mscl_id: req.body.muscle //mscl_id
      }})
        .then(par => {         
          if(par) {
            Exercise
              .create({
                name: req.body.name,
                definition: req.body.definition,
                img: req.body.img,
                exp_id: par.exp_id
              })
              .then(exercise => {
                return Exercise.findAll()
                  .then((part) => res.status(200).send(part))
                  .catch((error) => res.status(400).send(error))
                })
              .catch(error => res.status(400).send(error));
          }else {
            ExercParam.create({
              te_id: req.body.type, //te_id
              mscl_id: req.body.muscle //mscl_id
            })
            .then(crP => {
              Exercise
              .create({
                name: req.body.name,
                definition: req.body.definition,
                img: req.body.img,
                exp_id: crP.exp_id
              })
              .then(exercise => {
                return Exercise.findAll()
                  .then((part) => res.status(200).send(part))
                  .catch((error) => res.status(400).send(error))
                })
              .catch(error => res.status(400).send(error));
            })
              .catch(error => res.status(400).send(error));
            }
          })
          .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));            
  },
  
  /*----- список только упражнений -----*/
  listOnlyExercise(req, res) {
    return Exercise.findAll()
    .then((exercise) => {
      if (!exercise) {
        return res.status(404).send({message: 'Упражнений нет!'});
      }
      return res.status(200).send(exercise);
    })
    .catch((error) => res.status(400).send(error));  
  },
  
  /*----- добавить подходы и разы в упражнение -----*/
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
        //duration: req.body.duration,
        count: req.body.count
      }})
      .then(char => {          
        if(!char) {
          return Character
          .create({
            approach: req.body.approach,
            //duration: req.body.duration,
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

    
    
    
    /*----- добавить упражнение -----*/
    createExercParam(req, res) {
      ExercParam.findOne({where: {
          type: req.body.type,
          muscle: req.body.muscle
        }})
          .then(par => {         
            if(par) {
              return res.status(404).send({
                message: 'Уже существует!',
              })
            } else {

            }
              console.log(`прошли 1 ${par}`)
              return ExercParam
                .create({
                  type: req.body.type,
                  muscle: req.body.muscle
                })
                .then(exercise => { console.log(`прошли 2 ${exercise}`)
                res.status(201).send(exercise)})
                .catch(error => res.status(400).send(error));
              })
        //.catch(error => res.status(400).send(error));         
             // }
          //  })
         // .catch(error => res.status(400).send(error));      
          },
    
    
    
    
    
    /*----- обновить параметры упражнения -----*/
    updateCharToExer(req, res) {
      Exercise.findOne({where: {exercise_id: req.body.exercise_id}})
      .then(ex => {
        if(!ex) {
          return res.status(404).send({
          message: 'Упражнение не найдено!',
        })
      } else {
       Character.findByPk(req.params.character_id)
        .then(char => {          
          if(!char) {
            return Character
            .update({
              approach: req.body.approach,
              duration: req.body.duration,
              count: req.body.count
            })
            .then(character =>  {
             // res.render('/api/newExerciseToTrain')
           //   ex.addCharacter(character)
              res.status(201).send(character)
            })
          }/*else {
            ex.addCharacter(char)
            res.status(201).send(char)
          }*/
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
         /* include: [{
            model: Train,
            as: 'trains'
          },
          {
            model: Character,
            as: 'characters'
          }]*/
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
    addExerciseToTrain(req, res) {                                  //ТЕЕЕЕЕЕЕЕСТ
      Exercise.findAll({ where: { exercise_id: req.body.exercise_id } }) //return
      .then(newExercise => {
        Character.findOne({where: {
          approach: req.body.approach,
          duration: req.body.duration,
          count: req.body.count
        }})
        .then(char => {          
          if(!char) {
            Character.create({
              approach: req.body.approach,
              duration: req.body.duration,
              count: req.body.count
            })
            .then(character =>  {
              newExercise.addCharacter(character)
            })
          }else {
            newExercise.addCharacter(char)
          }
        })       
        //.catch(error => res.status(400).send(error));

            var exerciseToAdd = newExercise;
            Train.findOne({ where: { train_id: req.params.train_id } }) //return
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
      .findByPk(req.params.exercise_id)
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
      .findAll({ where: {exercise_id: req.body.exercise_id}})
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
    },

    /*-----удалить упражнение-----*/
    destroyCharExes(req, res) {
    return PlanTrain
      .findOne({where: {pt_id: req.body.ce_id}})
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
     // .catch(error => res.status(400).send(error));
  },
    
}