const Filter = require('../models').Filter
const Plan = require('../models').Plan

module.exports = {
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

    /*-----список групп с зависимыми моделями-----*/
    listFilter(req, res) {
      return Filter
        .findAll({
          include: [{
            model: Plan,
            as: 'filterPlan',
          }]
        })
        .then((filter) => {
          if (!filter) {
            return res.status(404).send({
              message: 'Todo Not Found',
            });
          }
          return res.status(200).send(filter);
        })
        .catch((error) => res.status(400).send(error));
      },
}