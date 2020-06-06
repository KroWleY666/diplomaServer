const Exercise = require('../models').Exercise
const Train = require('../models').Train
const Character = require('../models').Character
const Muscle = require('../models').Muscle
const TypeEx = require('../models').TypeEx
const PlanTrain = require('../models').PlanTrain
const CharEx = require('../models').CharEx
const TrainExercise = require('../models').TrainExercise


const db = require('../models/index')
const Op = db.Sequelize.Op;

let exerName = function(idTr) {
 
    Exercise.findOne({where: {exercise_id: idTr}, attributes: ['name']})
          .then(y => {
             let exName = y.name
             console.log(y.name)
            return exName
          })
        }
      
 


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
  
  /*----- список только мышц упражнения -----*/
  async filterExercise(req, res) {
    let filter = req.body.filter
    let m = req.body.muscle
    let t = req.body.type
    let findArgs = {}
    for (let key in filter) {
      if (filter[key].length > 0) {
        if (key === "muscle") {
          findArgs[key] = {
            $gte: filter[key][0],
            $lte: filter[key][1]
        }
      }
        if (key === "type") {
          findArgs[key] = {
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1]
        }
        }
      }else {
        findArgs[key] = filter[key];
    }
    Exercise.findAll({where: {}})

    }

    for(ms in filter){
      let k
      if(filter[ms] === 'muscle'){

      }
      if(filter[ms] === 'type'){
        
      }
    }
  },
  
  
  /*----- вывод характеристик упражнения -----*/
  extractCharToOneExer(req, res) {
    Exercise.findOne({where: {exercise_id: req.body.exercise_id}})
    .then(ex => {
      if(!ex) {
        return res.status(404).send({message: 'Нет упражнения!'})
    }else {
      /*let mas = []
      for (c in ex){
        rt = ex[c].getCharacters()
        console.log(`${rt}`)
        mas = [rt]
      }*/
      ex.getCharacters()
      .then(charEx => {
        return res.status(201).send({charEx, message: 'Список характеристик id упражнения получен!'})
      })
        .catch((error) => res.status(400).send({error, message: 'Что-то пошло не так...'}))
      }})
      .catch(er => res.status(404).send({er, message: 'Нет такого id упражнения!'}))
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
      .catch(error => res.status(400).send(error));
  },
  
  /* создание упражнения к тренировке ПО НОВЫМ СВЯЗЯМ */
  addCharToExer(req, res) {
    //console.log('addCharToExer работает здесь')
    Exercise.findOne({where: {exercise_id: req.body.exercise_id}})
    .then(ex => {
      if(!ex) {
        return res.status(404).send({message: 'Упражнение не найдено!'})
    }else { 
        Train.findOne({ where: { train_id: req.params.train_id } }) //return
        .then(train => {
          TrainExercise.findOne({where: {
            train_id: req.params.train_id,
            exercise_id: req.body.exercise_id
          }})
          .then(k => {
            if(k){
            return res.status(400).send('Запись с такими id тренировки и упражнения уже есть!'+error)
          }else{
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
              TrainExercise.create({
                train_id: req.params.train_id,
                exercise_id: req.body.exercise_id,
                character_id: character.character_id
              })
              .then(nTrEx => {
                console.log('Упражнение в тренировку добавлено!')
                return res.status(201).send(nTrEx)
              })
              .catch(error => res.status(400).send('Возможно некорректные поля TrainExercise!'+error))
            })
            .catch(error => res.status(400).send('Возможно некорректные поля Character!'+error))
          }else{
            TrainExercise.create({
              train_id: req.params.train_id,
              exercise_id: req.body.exercise_id,
              character_id: char.character_id
            })
            .then(nTrEx => {
              console.log('Упражнение в тренировку добавлено!')
              return res.status(201).send(nTrEx)
            })
            .catch(error => res.status(400).send('Возможно некорректные поля TrainExercise!'+error))
          }
        })
        .catch(error => res.status(400).send('Возможно некорректные поля TrainExercise!'+error))
        }})
        .catch(error => res.status(400).send('Возможно некорректные поля TrainExercise!'+error))
      })
      .catch(error => res.status(400).send('Возможно некорректные поля TrainExercise!'+error))
    }})
    .catch(error => res.status(400).send('Возможно некорректные поля TrainExercise!'+error))
  },

  /*вывод упражнений тренировки с характеристиками и подходами*/
  async extractExerToTrain(req, res) {
    let mas=[]
    try{
    const trEx = await TrainExercise.findAll({where: {train_id: req.params.train_id},raw: true})
      for (u in trEx){
        let g = trEx[u].train_ex_id
        let k = await Exercise.findOne({where: {exercise_id: trEx[u].exercise_id},raw: true})
        let exName = k.name
        let m = await Character.findOne({where: {character_id: trEx[u].character_id},raw: true})
        let approach = m.approach
        let count = m.count
        let duration = m.duration
        mas[u] = {
          exercise_id: trEx[u].exercise_id,
          name: exName,
          character_id: trEx[u].character_id,
          approach: approach,
          count: count,
          duration: duration
         }
        }
        return res.status(200).send(mas)
      }
      catch (err) {
        res.status(404).send('Ошибка: '+ err)
      }
  },
    
}