const Filter = require('../models').Filter
const Plan = require('../models').Plan

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
            as: 'plans',
            through: { attributes: [] }
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

      /*-----добавить в фильтр план-----*/
    addPlanToFilter(req, res) {
      const filter = req.body.filter_id
      return Plan.create({
        name: req.body.name
      }).then((plan) => {
        var c = plan
         Filter.findOne({ where: { filter_id: filter } }) .then((filter) => {
          return filter.set({plan})
        })
        .catch((error) => res.status(400).send(error));
      //  return filter.add({plan})
      }).catch((error) => res.status(400).send(error));
    /*  .then((filter) => {
        return filter.add({plan})
      })
      .then((plan) => {
        return c})*/
        /*.findAll({
          include: [{
            model: Plan,
            as: 'plans',
            through: { attributes: [] }
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
        .catch((error) => res.status(400).send(error));*/
      },
}