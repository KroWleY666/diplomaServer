const Filter = require('../models').Filter
const Plan = require('../models').Plan
const PlanFilter = require('../models').PlanFilter

module.exports = {

    /*-----создать фильтр-----*/
    create(req, res) {
      return Filter
        .create({
          goal: req.body.goal,
          level: req.body.level,
          period: req.body.period,
          type: req.body.type,
          duration: req.body.duration
        })
        .then(filter => res.status(201).send(filter))
        .catch(error => res.status(400).send(error));
    },

    /*-----список фильтров С МОДЕЛЯМИ-----*/
    listFilter(req, res) {
      return Filter
        .findAll({
          include: [{
            model: Plan,
            as: 'plans'
          }]
        })
        .then((filter) => {
          if (!filter) {
            return res.status(404).send({
              message: 'Фильтров нет!',
            });
          }
          return res.status(200).send(filter);
        })
        .catch((error) => res.status(400).send(error));
      },
      
      /*---------добавить в фильтр план---------*/
      addPlanToFilter(req, res) {
        Plan.findOne({ where: {plan_id: req.body.plan_id}}) //return
        .then(newPlan => {
              var planToAdd = newPlan;
              Filter.findOne({ where: { filter_id: req.body.filter_id } }) //return
        .then(filter => {
                filter.addPlan(planToAdd) //return
                .then(function(ans){
                  res.status(201).send(planToAdd)
                  planToAdd;//return
                })
                .catch((error) => res.status(400).send(error));          
        })
        .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
    },
    
    /*----------удалить фильтр----------*/
    destroyFilter(req, res) {
      return Filter
        .findByPk(req.body.filter_id)
        .then(filter => {
          if (!filter) {          
            return res.status(404).send({
              message: 'Фильтр не найден!'
            });
          }
          return filter
            .destroy()
            .then(() => res.status(200).send({
              message: 'Фильтр удален!'
            }))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },


  /*---------проверить связь фильтра и плана---------*/
  PlanAndFilter(req, res) {
    return FilterPlan.findAll().then(connect => {
      res.status(201).send(connect)
    }).catch((error) => res.status(400).send(error));
  }

  /*Promise.all([User.create(), City.create()])
    .then(([user, city]) => UserCity.create({userId: user.id, cityId: city.id}))*/

}