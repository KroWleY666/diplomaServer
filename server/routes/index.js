const rolesController = require('../controllers').roles;
const userRolesController = require('../controllers').userRoles;
const usersController = require('../controllers').users;
const groupsController = require('../controllers').groups;
const filtersController = require('../controllers').filters;
const exercisesController = require('../controllers').exercises;
const plansController = require('../controllers').plans;

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

  app.post('/api/addtogroup', groupsController.addParticipant); //ok
  

  /*---------- filters ----------*/
  app.post('/api/newFilters', filtersController.create); //
  app.get('/api/listFilter', filtersController.listFilter); //

  /*---------- exercises ----------*/
  app.post('/api/:trainExercise/newExercises', exercisesController.create); // ok +
  app.get('/api/listExercises', exercisesController.listExercise); // ok

  /*---------- planes ----------*/
  app.post('/api/newPlan', plansController.create); // 
  app.get('/api/listPlan', plansController.listPlan); // 

  app.post('/api/newTrain', plansController.createTrain); // 
  app.get('/api/listTrain', plansController.listTrain); // 


  app.get('/api/listTEx', plansController.listTEx); // 
  


  app.post('/api/newListTrain', plansController.createTrainExercise); // 
  


  app.post('/api/:trainExercise/listManyToMany', plansController.listTrainExercise); //
  



  app.post('/api/addSportsmen', groupsController.addParticipant222); // ok +-
  app.get('/api/listSportsmen', groupsController.listParticipant); // ok
  app.delete('/api/delSportsmen', groupsController.destroyParticipant); //ok

};