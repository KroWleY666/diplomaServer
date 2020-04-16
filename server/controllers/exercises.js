const Exercise = require('../models').Exercise

module.exports = {

    /*----- добавить упражнение -----*/
    create(req, res) {
      return Exercise
        .create({
          name: req.body.name,
          approach: req.body.approach,
          duration: req.body.duration,
          count: req.body.count,
          day: req.body.day,
          trainExercise: req.params.trainExercise
        })
        .then(exercise => res.status(201).send(exercise))
        .catch(error => res.status(400).send(error));
    },

    /*----- список всех упражнений -----*/
    listExercise(req, res) {
      return Exercise
        .findAll()
        .then((exercise) => {
          if (!exercise) {
            return res.status(404).send({
              message: 'Exercise Not Found',
            });
          }
          return res.status(200).send(exercise);
        })
        .catch((error) => res.status(400).send(error));
      },

    
}