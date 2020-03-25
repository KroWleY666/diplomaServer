const Filter = require('../models').Filter

module.exports = {
    create(req, res) {
      return Filter
        .create({
          goal: req.body.goal,
          level: req.body.level,
          period: req.body.period,
          type: req.body.type,
          duration: req.body.duration,
          name: req.body.name
        })
        .then(filter => res.status(201).send(filter))
        .catch(error => res.status(400).send(error));
    }
}