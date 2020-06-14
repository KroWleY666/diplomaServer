const DateTrain = require('../models').DateTrain
const Train = require('../models').Train
const Exercise = require('../models').Exercise
const Participant = require('../models').Participant
const TrainExercise = require('../models').TrainExercise

const LevelTrain = require('../models').LevelTrain
const TypeTrain = require('../models').TypeTrain
const DETrain = require('../models').DETrain


const db = require('../models/index')
const Op = db.Sequelize.Op;

module.exports = {

  /********************* ТРЕНИРОВКИ/УПРАЖНЕНИЯ *********************/
  
  /*----------создать отдельно тренировку----------*/
  createTrain(req, res) {
    Train.findOne({where : {name: req.body.name}})
    .then(tr => {
      if(tr) {
        return res.status(404).send({message: 'Тренировка уже существует!'})
      }else {
        return Train.create({
            name: req.body.name,
            type_train_id: req.body.type,
            duration: req.body.duration,
            level_train_id: req.body.level,
            definition: req.body.definition
          })
          .then(train => res.status(201).send(train))   
          .catch(error => res.status(400).send({error, message: 'Возможно некорректные поля!'})); 
        }
      })      
      .catch(error => res.status(400).send({error, message: 'Что-то пошло не так...'}));
  },
  
  /*----- список уровней -----*/
  listLevelTrain(req, res) {
    return LevelTrain.findAll()
    .then((mus) => {
      if (!mus) {
        return res.status(404).send({message: 'Уровней нет!'});
      }
      return res.status(200).send(mus);
    })
    .catch((error) => res.status(400).send(error));  
  },
  
  /*----- список типов тренировок -----*/
  listTypeTrain(req, res) {
    return TypeTrain.findAll()
    .then((mus) => {
      if (!mus) {
        return res.status(404).send({message: 'Типов тренировки нет!'});
      }
      return res.status(200).send(mus);
    })
    .catch((error) => res.status(400).send(error));  
  },
  
  /*----------список тренировок----------*/
  listTrain(req, res) {
    return Train
      .findAll()
      .then((train) => {
        if (!train) {
          return res.status(404).send({
            message: 'Тренировки не найдены!',
          });
        }
        return res.status(200).send(train);
      })
      .catch((error) => res.status(400).send(error));
  },
  
  /*-----удалить тренировку-----*/
  destroyTrain(req, res) {
    return Train
      .findByPk(req.params.train_id)
      .then(train => {
        if (!train) {          
          return res.status(404).send({
            message: 'Тренировка не найдена!'
          });
        }
        return train
          .destroy()
          .then(() => res.status(200).send({
            message: 'Тренировка удалена!'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  
  /*----- список только мышц упражнения -----*/
  async filterTrain(req, res) {
  try{
    let t
    let m
    if(req.body.type){
     t = await Train.findAll({where: {type_train_id: {[Op.or]: [req.body.type]}}})
    }
    if(req.body.level){
     m = await Train.findAll({where: {level_train_id: {[Op.or]: [req.body.level]}}})
  }
    let y
    if(t && m){
      console.log('first if')
      y = await Train.findAll({where: {level_train_id: req.body.level,
        type_train_id: req.body.type}})
        return res.status(200).send({y, message: 'Есть тренировки с указанными типом и уровнем! M&&T'})
      }else{
      if(t){
        console.log('second if')
        return res.status(200).send({t, message: 'Есть тренировки с указанными типом и уровнем! T'})
      } 
      if (m){
        console.log('third if')
        return res.status(200).send({m, message: 'Есть тренировки с указанными типом и уровнем! M'})
      }
    }
  }catch(err){
    return res.status(400).send({err, message: 'error'})
  }
  },
    
    
    
    
    
    /*----------вывод инфы об ОДНОЙ тренировке и ее упражнений----------*/
    listOneTrain(req, res) {
      return Train
        .findOne({ where: {train_id: train_id.params.train_id},
          include: [{
            model: Exercise,
            as: 'exercises'
          }/*,{
            model: DateTrain,
            as: 'dates'
          }*/]
        })
        .then((train) => {
          if (!train) {
            return res.status(404).send({
              message: 'Тренировка не найдена!',
            });
          }
          return res.status(200).send(train);
        })
        .catch((error) => res.status(400).send(error));
    },
    
    /*-----вся инфа об упражнениях тренировки-----*/
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

    /*-----список тренировоктренировки из даты-----*/
    listTrainWithExercise(req, res) {
      TrainExercise
        .destroy({where: {train_id: req.body.train_id}})
        /*({where: {train_id: req.params.train_id},
          attributes: ['exercise_id']
        })*/
        .then(train => {
          if (!train) {          
            return res.status(404).send({
              message: 'Тренировки нет!'
            });
          }
          return res.status(201).send(train);        
        })
        .catch(error => res.status(400).send(error));
      }, 
      
      
  
      
  /********************* ТРЕНИРОВКИ/ДАТЫ *********************/
 
    /*----------создать дату для тренировки----------*/
  async createDT(req, res) {
   /* let v = await DateTrain.findOne({where: {
      from: req.body.from,
      to: req.body.to,
      participant_id: req.params.participant_id
    }})
    let tr = await Train.findOne({ where: { train_id: req.body.train_id } })
    if(!v){

    }*/
        DateTrain.findOne({where: {
          from: req.body.from,
          to: req.body.to,
          participant_id: req.params.participant_id
        }}).then(nDT => {
          if(!nDT) {
            DateTrain.create({
              from: req.body.from,
              to: req.body.to,
              participant_id: req.params.participant_id
            }).then(newDT => {
              Train.findOne({ where: { train_id: req.body.train_id } }) //return
                .then(train => {  
                  train.addDate(newDT) 
                  console.log(train)
                  res.status(201).send(newDT)    
                  //return newDT
              })
              .catch((error) => res.status(400).send(error))
            })
          } else {
            Train.findOne({ where: { train_id: req.body.train_id } }) //return
              .then(train => {           
                train.addDate(nDT)   
                console.log(train)
                res.status(201).send(nDT)       
               // return nDT          
            })
            .catch((error) => res.status(400).send(error));
          }
        })
        .catch((error) => res.status(400).send(error));
    },
    
    /*-----вся инфа об датах тренировок одного спортсмена-----*/
  async allDateTrainsInfo(req, res) {
   /* DateTrain.findAll({where: {participant_id: req.params.participant_id}})
    .then(async dt => {
      DETrain.findAll({where: {dt_id: dt.dt_id}})
      .then(async detr => {
        let trn = await Train.findOne({where: {train_id: detr.train_id},raw: true})
        let type = await TypeTrain.findOne({where: {type_train_id: trn.type_train_id},raw: true})
        return res.status(200).send({detr})
      })
    })*/





      try{

      
      let mas2=[]
      const deTr = await DateTrain.findAll({where: {participant_id: req.params.participant_id},raw: true})
        for (u in deTr){
          let dt_id = deTr[u].dt_id
          let participant_id = deTr[u].participant_id
          let from = deTr[u].from
          let to = deTr[u].to
         // console.log('g = ' + g)
         let mas=[]
          const k = await DETrain.findAll({where: {dt_id: deTr[u].dt_id},raw: true})
          for(w in k){
           // let max = kLeng+uLeng
            let deTr_id = k[w].detrain_id
            let train_id = k[w].train_id

            let trn = await Train.findOne({where: {train_id: k[w].train_id},raw: true})
            let type = await TypeTrain.findOne({where: {type_train_id: trn.type_train_id},raw: true})
            let nameTrain = trn.name
            let type_train_id = type.type_train_id
            let nameType = type.name
           // let g = u+m

            mas[w] = {//[u]
              dt_id: dt_id,
              from: from,
              to: to,
              participant_id: participant_id,
              detrain_id: deTr_id,
              train_id: train_id,
              nameTrain: nameTrain,
              nameType: nameType,
              type_train_id: type_train_id
             }
            }
            mas2[u] = {mas}

          }
          return res.status(200).send({mas2})
        }catch(err){
          return res.status(400).send(err)
        }
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
}