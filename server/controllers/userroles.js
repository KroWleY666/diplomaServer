const UserRole = require('../models').UserRole;

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
  }
};