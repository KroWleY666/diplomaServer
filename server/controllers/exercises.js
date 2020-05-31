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
      Exercise.create({
        name: req.body.name,
        definition: req.body.definition,
        img: req.body.img,
        te_id: req.body.type
      })
      .then((exercise) => {
        Muscle.findOne({where: {mscl_id: req.body.muscle}})
        .then(ms => {   // console.log(`${}`)  console.log('прошли')
          exercise.addMuscle(ms)
          return Exercise.findAll({include: [{
            model: Muscle,
            as: 'muscles'
          }]})
          .then(exerc => res.status(200).send({exerc, message: 'Упражнение добавлено!'}))
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send({error, message: 'Не найдены мышцы!'}));
      })
      .catch(error => res.status(400).send({error, message: 'Некорректно добавлено упражнение!'}))
    }
  })
  .catch(error => res.status(400).send({error, message: 'Возможно пустое название!'}));                   
  },
  
  /*----- список только мышц -----*/
  listMuscle(req, res) {
    return Muscle.findAll()
    .then((mus) => {
      if (!mus) {
        return res.status(404).send({message: 'Мышц нет!'});
      }
      return res.status(200).send(mus);
    })
    .catch((error) => res.status(400).send(error));  
  },
  
  /*----- список только типов упражнений -----*/
  listTypeEx(req, res) {
    return TypeEx.findAll()
    .then((te) => {
      if (!te) {
        return res.status(404).send({message: 'Мышц нет!'});
      }
      return res.status(200).send(te);
    })
    .catch((error) => res.status(400).send(error));  
  },
  
  /*----- список только упражнений с его характеристиками -----*/
  listOnlyExercise(req, res) {
    return Exercise.findAll({include: [{
      model: Muscle,
      as: 'muscles'
    }]})
    .then((exercise) => {
      if (!exercise) {
        return res.status(404).send({message: 'Упражнений нет!'});
      }
      return res.status(200).send(exercise);
    })
    .catch((error) => res.status(400).send(error));  
  },
  

  
  /*----- добавить подходы и разы в упражнение, вывод упражнений с характеристиками и подходами -----*/
  addCharToExer(req, res) {
    Exercise.findOne({where: {exercise_id: req.body.exercise_id}})
    .then(ex => {
      if(!ex) {
        return res.status(404).send({
        message: 'Упражнение не найдено!',
      })
    }else {
     Character.findOne({where: {
        approach: req.body.approach,
        duration: req.body.duration,
        count: req.body.count
      }})
      .then(char => {          
        if(!char) {
          Character
          .create({
            approach: req.body.approach,
            duration: req.body.duration,
            count: req.body.count
          })
          .then(character =>  {            
            ex.addCharacter(character)
            return Exercise.findAll({include: [{
              model: Character,
              as: 'characters'
            },
            {
              model: Muscle,
              as: 'muscles'
            }]})
            .then(ch =>  res.status(201).send({ch, message: 'Новые подходы добавлены!'}))
            .catch(error => res.status(400).send({error, message: 'Что-то пошло не так...'}));
          })
          .catch(error => res.status(400).send({error, message: 'Возможно некорректные поля!'}));
        }else {
          ex.addCharacter(char)
          return Exercise.findAll({include: [{
            model: Character,
            as: 'characters'
          },
          {
            model: Muscle,
            as: 'muscles'
          }]})
          .then(ch =>  res.status(201).send({ch, message: 'Существующие подходы добавлены!'}))
          .catch(error => res.status(400).send({error, message: 'Что-то пошло не так...'}));
        }
      })       
      .catch(error => res.status(400).send({error, message: 'Возможно некорректные поля!'}));
    }})
    .catch(error => res.status(400).send({error, message: 'Что-то пошло не так...'}));      
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


    /*---------добавить в тренировку упражнение---------*/
    addExerciseToTrain(req, res) {  
      Character.findOne({where: {
        approach: req.body.approach,
        duration: req.body.duration,
        count: req.body.count }})
      .then(char => { 
        Exercise.findAll({ where: { exercise_id: req.body.exercise_id } }) //return
        .then(newExercise => {
          if(!char) {
          Character.create({
            approach: req.body.approach,
            duration: req.body.duration,
            count: req.body.count
          })
          .then(character =>  {
            return newExercise.addCharacter(character)
          })
          .catch((error) => res.status(400).send(error));
        }else {
          return newExercise.addCharacter(char)
        }

        
      })       
      //.catch((error) => res.status(400).send(error));
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
      //.catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
      
      
      
      //ТЕЕЕЕЕЕЕЕСТ
     /* Exercise.findAll({ where: { exercise_id: req.body.exercise_id } }) //return
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
    .catch((error) => res.status(400).send(error));*/
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