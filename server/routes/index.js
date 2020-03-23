const rolesController = require('../controllers').roles;
const userRolesController = require('../controllers').userRoles;
const usersController = require('../controllers').users;
const groupsController = require('../controllers').groups;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/roles', rolesController.create);
  app.get('/api/roles', rolesController.list);
  app.get('/api/roles/:role_id', rolesController.retrieve); // получить один по id
  app.put('/api/roles/:role_id', rolesController.update);
  app.delete('/api/roles/:role_id', rolesController.destroy);

  app.post('/api/roles/:role_id/userRoles', userRolesController.create);

  app.post('/api/register', usersController.register); //ok
  app.post('/api/login', usersController.login);
  app.get('/api/usersList', usersController.list);//ok


  app.post('/api/newGroup', groupsController.create); //ok
  app.get('/api/groups', groupsController.list); //ok
  app.get('/api/groupusersList', groupsController.findParticipant); //ok

  app.post('/api/addtogroup', groupsController.addParticipant222); 
};