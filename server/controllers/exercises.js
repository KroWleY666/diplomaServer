const Exercise = require('../models').Exercise
const Train = require('../models').Train
const Character = require('../models').Character
const Muscle = require('../models').Muscle
const TypeEx = require('../models').TypeEx
const PlanTrain = require('../models').PlanTrain

module.exports = { 
  
  /*----- добавить упражнение с его типом и мышцами -----*/
  createExercise(req, res) {      
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
        Muscle.findAll({where: {mscl_id: req.body.muscle }})
        .then(ms => {   // console.log(`${}`)  console.log('прошли')
          exercise.addMuscle(ms)          
          return Exercise.findAll(/*{include: [{
            model: Muscle,
            as: 'muscles'
          }]}*/)
          .then(exerc => {
           // exerc.getMuscles()
            res.status(200).send({exerc, message: 'Упражнение добавлено!'})})
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send({error, message: 'Не найдены мышцы!'}));
      })
      .catch(error => res.status(400).send({error, message: 'Некорректно добавлено упражнение!'}))
    }
  })
  .catch(error => res.status(400).send({error, message: 'Возможно пустое название!'}));                   
  },
  
  /*----- список только мышц упражнения -----*/
  listOneExAndMuscles(req, res) {
    Exercise.findOne({where: {exercise_id: req.params.exercise_id}})
    .then(ec=>{
      if (!ec) {          
        return res.status(404).send({
          message: 'Упражнения нет!'
        })
      }
      ec.getMuscles().then(ex => {
        for(exer of ex){ console.log("muscle:", exer.title) }
        return res.status(200).send(ex)
      })
      .catch(error => res.status(400).send({error, message: 'Мышц у упражнения нет!'}))
  })
  .catch(error => res.status(400).send({error, message: 'Нет такого id упражнения!'}))
  },
  
  /*----- список ВСЕХ УПРАЖНЕНИЙ С МЫШЦАМИ -----*/
 /* listOneExAndMuscles(req, res) {
    Exercise.findAll({include: [{
      model: Muscle,
      as: 'muscles'
    }]})
    .then(ec=>{
      if (!ec) {          
        return res.status(404).send({
          message: 'Упражнения нет!'
        })
      }
        return res.status(200).send(ec)
      .catch(error => res.status(400).send({error, message: 'Мышц у упражнения нет!'}))
  })
  .catch(error => res.status(400).send({error, message: 'Нет такого id упражнения!'}))
  },*/
  
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
  
  /*----- список только мышц -----*/
  listTypeEx(req, res) {
    return TypeEx.findAll()
    .then((te) => {
      if (!te) {
        return res.status(404).send({message: 'Типов упражнений нет!'});
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
        return res.status(404).send({message: 'Упражнение не найдено!'})
    }else {
     Character.findOne({where: {
        approach: req.body.approach,
        duration: req.body.duration,
        count: req.body.count
      }})
      .then(char => {  
        Train.findOne({ where: { train_id: req.params.train_id } }) //return
        .then(train => {
          if(!char) {
            Character.create({
              approach: req.body.approach,
              duration: req.body.duration,
              count: req.body.count
            })
            .then(character =>  {            
              ex.addCharacter(character)
              train.addExercise(ex) //return
              .then(ans => {return res.status(201).send({train,
                message: 'Упражнение в тренировку добавлено!'})})
              .catch((error) => res.status(400).send({error, message: 'Что-то пошло не так...'}));
          })
          .catch((error) => res.status(400).send({error, message: 'Возможно некорректные поля!'}));
        }else {
          ex.addCharacter(char)
          train.addExercise(ex) //return
            .then(ans => {return res.status(201).send({train,
              message: 'Упражнение в тренировку добавлено!'})})
            .catch((error) => res.status(400).send({error, message: 'Что-то пошло не так...'}));
        }
      })       
      .catch(error => res.status(400).send({error, message: 'Возможно некорректные поля!'}));
    })
    .catch(error => res.status(400).send({error, message: 'Что-то пошло не так...'}));  
  }})
  .catch(error => res.status(400).send({error, message: 'Что-то пошло не так...'}));  
  },
  
  /*-----удалить упражнение-----*/
  destroyExercise(req, res) {
    Exercise.findByPk(req.params.exercise_id)
      .then(exercise => {
        if (!exercise) {          
          return res.status(404).send({
            message: 'Упражнение не найдено!'
          });
        }
        exercise.destroy()
          .then(() => {
            return Exercise.findAll()
            .then(exerc => res.status(200).send({exerc, message: 'Упражнение удалено!'}))
            .catch(error => res.status(400).send({error, message: 'Что-то пошло не так...'}));
            })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
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