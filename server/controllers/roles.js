const Role = require('../models').Role
const UserRole = require('../models').UserRole;

module.exports = {
    create(req, res) {
      return Role
        .create({
          role_name: req.body.role_name,
        })
        .then(role => res.status(201).send(role))
        .catch(error => res.status(400).send(error));
    },

    list(req, res) {
      return Role
        .findByPk(req.params.role_id, {
          include: [{
            model: UserRole,
            as: 'userRoles',
          }],
        })
        .then((role) => {
          if (!role) {
            return res.status(404).send({
              message: 'Todo Not Found',
            });
          }
          return res.status(200).send(role);
        })
        .catch((error) => res.status(400).send(error));
      },

      retrieve(req, res) {
        return Role
          .findByPk(req.params.role_id, {
            include: [{
              model: UserRole,
              as: 'userRoles',
            }],
          })
          .then((role) => {
            if (!role) {
              return res.status(404).send({
                message: 'Todo Not Found',
              });
            }
            return res.status(200).send(role);
          })
          .catch((error) => res.status(400).send(error));
      },
    
      update(req, res) {
        return Role
          .findByPk(req.params.role_id, {
            include: [{
              model: UserRole,
              as: 'userRoles',
            }],
          })
          .then(role => {
            if (!role) {
              return res.status(404).send({
                message: 'Todo Not Found',
              });
            }
            return role
              .update({
                role_name: req.body.role_name || role.role_name,
              })
              .then(() => res.status(200).send(role))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      destroy(req, res) {
        return Role
          .findByPk(req.params.role_id)
          .then(role => {
            if (!role) {
              return res.status(400).send({
                message: 'Todo Not Found',
              });
            }
            return role
              .destroy()
              .then(() => res.status(204).send())
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },   
  }