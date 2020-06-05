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
  filterExercise(req, res) {
    /*Exercise.findAll({where: {te_id:{ $in: req.body.type}}})
    Muscle.findAll({where: {mscl_id:{ $in: req.body.muscle}}})
    let mas = []
    for (m in mscl){
      mas[m] = mscl.getExercises({where: {te_id:{ $in: req.body.type}})
    }*/
    /*.then(ex => {
      Muscle.findAll({where: {mscl_id:{ $in: req.body.muscle}}})
      .then(ms => {
        if(ex && ms){
          ms.getExercises(ex)
          .then(mt => {return res.status(200).send({mt, message: 'Есть упражнения с указанными типами и мышцами!'})})
          .catch(er => res.status(400).send({er, message: 'Что-то пошло не так...'}))
        }else{

        }
        
      })
    })

    const mscls = Muscle.findAll({where: {mscl_id:{ $in: req.body.muscle}}})
    const type = Exercise.findAll({where: {te_id:{ $in: req.body.type}}})
    if(mscls || type){
      if(mscls){
       // Exercise.findAll().then(ex => {
          mscls.getExercises()
          .then(ex1 => {
            if(type && ex1){
              ex1.findAll({where: {te_id:{ $in: req.body.type}}})
              .then(exEnd => {return res.status(200).send({exEnd, message: 'Есть упражнения с указанными типами и мышцами!'})})
              .catch(er => res.status(400).send({er, message: 'Что-то пошло не так...'}))
            }else{

            }
            })
          }
            //return res.status(200).send({ex1, message: 'Есть упражнения с указанными типами и мышцами!'})})
         // .catch(er => res.status(400).send({er, message: 'Что-то пошло не так...'}))
       // })
        //.catch(er => res.status(400).send({er, message: 'Что-то пошло не так...'}))
        
     // }else{
     //   return res.status(200).send({type, message: 'Есть упражнения указанными типами!'})
     // }
      //return res.status(400).send({type, message: 'Есть упражнения указанными типами!'})
    }*/
  },
  

  //РАБОТАЕТ НОРМ
  /*----- добавить подходы и разы в упражнение, вывод упражнений с характеристиками и подходами -----*/
 /* addCharToExer(req, res) {
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
              .then(ans => {
                console.log('Упражнение в тренировку добавлено!')
                return res.status(201).send(train)})
              .catch((error) => res.status(400).send({error, message: 'Что-то пошло не так...'}));
          })
          .catch((error) => res.status(400).send({error, message: 'Возможно некорректные поля!'}));
        }else {
          ex.addCharacter(char)
          train.addExercise(ex) //return
            .then(ans => {
              console.log('Упражнение в тренировку добавлено!')
              return res.status(201).send(train)})
            .catch((error) => res.status(400).send({error, message: 'Что-то пошло не так...'}));
        }
      })       
      .catch(error => res.status(400).send({error, message: 'Возможно некорректные поля!'}));
    })
    .catch(error => res.status(400).send({error, message: 'Что-то пошло не так...'}));  
  }})
  .catch(error => res.status(400).send({error, message: 'Что-то пошло не так...'}));  
  },*/
  
  
  /*----- вывод упражнений тренировки с характеристиками и подходами -----*/
  /*extractExerToTrain(req, res) {
    Train.findOne({where: {train_id: req.params.train_id}})
    .then(tr => {
      if(!tr) {
        return res.status(404).send({message: 'Тренировка не найдена!'})
    }else {
      tr.getExercises({include: [{
        model: Character,
        as: 'characters', 
       // required: true//,
        //through: { attributes: ['character_id'] }
      }], attributes: ['exercise_id', 'name']})
      .then(trEx => {  
        //console.log(trEx.exercise_id)
      //  trEx.getExercises()
      let exMs = {}
      for (let k in trEx){
        
        Exercise.findOne({where: {exercise_id: trEx[k].exercise_id}})
        .then(exs => {
         // CharEx.findOne()
          //Character.findAll().then(rt => {
           /* exs.getCharacters().then(t => {
              console.log('getCharacters 1 '+t)
            })*/
         // })
         /* exs.getCharacters({where: {exercise_id: trEx[k].exercise_id}})
          .then(t => {
            console.log('getCharacters 2 '+t)
          })
          console.log('exs ' + exs)
        })

      }
        
        let mas = {} 
        for (let g in trEx){
         // console.log(g)
          mas[g] = {
            exercise_id: trEx[g].exercise_id,
            ex_name: trEx[g].name,
           // ex_char: trEx[g].Character.characters
          }
          
          console.log(mas)

        }
        for (let k in mas){

        }

        /*var id_map = {};
        for (var i = 0; i < trEx.length; i++) {
          id_map[trEx[i].character_id] = 1;
          console.log(`${trEx[i].character_id}`)
        }
        Exercise.findAll({
          where: { exercise_id: [Object.keys(id_map)] }
        })
        .then(m => {return res.status(201).send({m, message: 'Список id упражнений получен!'})})
        .catch(res.status(400).send({error, message: 'Что-то пошло не так...'}))*/
       /* return res.status(201).send({trEx, message: 'Список id упражнений получен!'})})
      .catch((error) => res.status(400).send({error, message: 'Что-то пошло не так...'}))
      }})
      .catch(er => res.status(404).send({er, message: 'Нет такого id тренировки!'}))
  },*/
  
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
  
  /* создание упражнения к тренировке ПО НОВЫМ СВЯЗЯМ */
  addCharToExer(req, res) {
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
              //TrEx.addCharacters(character)
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

           /* })
            }else{
              TrEx.addCharacters(char)
            }
            console.log('Упражнение в тренировку добавлено!')
            return res.status(201).send(train)



          train.addExercise(ex)
          .then(newExToTr => {
            TrainExercise.findOne({where: {//{train_ex_id: newExToTr.train_ex_id
            train_id: req.params.train_id,
            exercise_id: req.body.exercise_id
          }})
          .then(TrEx => {
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
              TrEx.addCharacters(character)})
            }else{
              TrEx.addCharacters(char)
            }
            console.log('Упражнение в тренировку добавлено!')
            return res.status(201).send(train)
          })     
          .catch(error => res.status(400).send({error, 
            message: 'Возможно некорректные поля характеристик!'}))
          })
          .catch(error => res.status(400).send({error, 
            message: 'Не найдена запись в TrainExercise!'}))
          })       
          .catch(error => res.status(400).send({error, message: 'Возможно не получилось добавить поле train.addExercise!'}));
        })
        .catch(error => res.status(400).send({error, message: 'Что-то пошло не так...'}));  
      }})
      .catch(error => res.status(400).send({error, message: 'Что-то пошло не так...'})); */
  },


  
  /*вывод списка упражнений тренировки ПО НОВОЙ СХЕМЕ */
  async extractExerToTrain(req, res) {
    //let trEx
    let obj = new Object()
    let mas=[]
    const trEx = await TrainExercise.findAll({where: {train_id: req.params.train_id},raw: true})
        for (u in trEx){
          let g = trEx[u].train_ex_id
        console.log('g = ' + g)
        

         let k = await Exercise.findOne({where: {exercise_id: trEx[u].exercise_id},raw: true})
         // let c = k.name
         // .then(y => {
            let exName = k.name
            //return exName})
            console.log('exName'+exName);

          

          let m = await Character.findOne({where: {character_id: trEx[u].character_id},raw: true})
          // let c = k.name
          // .then(y => {
             let approach = m.approach
             let count = m.count
             let duration = m.duration
             //return exName})
             console.log('approach '+approach+' count '+count+' duration '+duration);

             mas[u] = {
              exercise_id: trEx[u].exercise_id,
              name: exName,
              character_id: trEx[u].character_id,
              approach: approach,
              count: count,
              duration: duration
             }
            /* mas.entries(obj)
             obj[u] = [{
              exercise_id: trEx[u].exercise_id,
              name: exName,
              character_id: trEx[u].character_id,
              approach: approach,
              count: count,
              duration: duration
             }]*/
 
        }
        return res.status(200).send({mas})

             //= exerName(allExs[b].exercise_id)
       // console.log(trEx)
     // console.log('vot chto 22 = ' +trEx.train_id)//["train_id"]

      /*for (uk in trEx.train_id){
        let g = trEx[uk].train_id
        console.log('g = ' + g)
      }*/

      
      /*TrainExercise.findAll({where: {train_id: req.params.train_id}})
      .then(async allExs => {
        let mas = []
        let h = {}
        for(let b in allExs){
          console.log(b)

          //let dh = allExs[b]
         // let k = Exercise.findOne({where: {exercise_id: allExs[b].exercise_id}})
         // let c = k.name
          /*.then(y => {
             exName = y.name
            return exName})*/
            //console.log(await m);
             //= exerName(allExs[b].exercise_id)
           // console.log('in extract name = '+ exName)
          /* let exName = await Exercise.findOne({where: {exercise_id: allExs[b].exercise_id}})
          .then(async y => {
             let exName = y.name
             console.log(exName)
            return exName
          })
          console.log('vot chto = ' +exName)
          //.catch(er => res.status(404).send('Exercise.findOne!'+er))
          let chars = await Character.findOne({where: {character_id: allExs[b].character_id}})
          .then(f => {
            
           // console.log(f)
            var approach = f.approach
            var count = f.count
            var duration = f.duration
            return f
         })
         console.log('vot chto 22 = ' +f["character_id"])
        //  .catch(er => res.status(404).send('Character.findOne!'+er))
          //console.log(exName, approach)
          
          h[b] = {
            exercise_id: allExs[b].exercise_id,
            name: exName,
            character_id: allExs[b].character_id,
            approach: approach,
            count: count,
            duration: duration
          }
          mas = [h]
          console.log(mas)
          //return h
          
       // })
        //console.log(mas)
        
        //})
       // console.log(y)
        }
      
        return res.status(200).send({h})
        //return res.status(200).send(mas)

      })
        .catch(er => res.status(404).send('Нет такого id тренировки!'+er))*/
  },
    
}