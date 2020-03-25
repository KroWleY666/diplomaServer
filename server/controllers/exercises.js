const Exercise = require('../models').Exercise

module.exports = {
    create(req, res) {
      return Exercise
        .create({
          name: req.body.name,
          approach: req.body.approach,
          duration: req.body.duration,
          day: req.body.day
        })
        .then(exercise => res.status(201).send(exercise))
        .catch(error => res.status(400).send(error));
    }
}