const UserRole = require('../models').UserRole;
const ParamName = require('../models').ParamName;

module.exports = {
  create(req, res) {
    console.log(`${req.body.role_name}, ${req.params.role_id}`)
    return UserRole
      .create({
        role_name: req.body.role_name,
        role_id: req.params.role_id,
      })
      .then(userRole => res.status(201).send(userRole))
      .catch(error => res.status(400).send(error));
  },

  destroyParam(req, res) {
    return ParamName
      .findByPk(req.body.user_role_id)
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
};