const Group = require('../models').Group
const User = require('../models').User

module.exports = {
    create(req, res) {
      return Group
        .create({
          title: req.body.title,
          sport: req.body.sport
        })
        .then(group => res.status(201).send(group))
        .catch(error => res.status(400).send(error));
    },

    list(req, res) {
      return Group
        .findAll()//findByPk(req.params.group_id)
        .then((group) => {
          if (!group) {
            return res.status(404).send({
              message: 'Todo Not Found',
            });
          }
          return res.status(200).send(group);
        })
        .catch((error) => res.status(400).send(error));
      },

      addParticipant(req, res) {
        return User
        .findAll({where: {role: 'Спортсмен', name: req.body.name}})
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'Todo Not Found',
              });
            }
            return res.status(200).send(user);
          })
          .catch((error) => res.status(400).send(error));
      },


      addParticipant222(req, res) {     
        User.findAll({where: {role: 'Спортсмен', name: req.body.name}})
          .then((user) => {
            console.log(`user == ${user}`)
            if (!user) {
              return res.status(404).send({
                message: 'Todo Not Found',
              });
            }
            else {
               /* user.create({
                    group_id: req.params.group_id
                })*/
              //return Group.findAll({where: {group_id: req.params.group_id}})  
            }
            return res.status(200).send(user);
          })
          .catch((error) => res.status(400).send(error));
      },

      findParticipant(req, res) {
        return User
        .findAll({where: {role: 'Спортсмен'}})
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'Todo Not Found',
              });
            }
            return res.status(200).send(user);
          })
          .catch((error) => res.status(400).send(error));
      },
}