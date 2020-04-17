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



  /*-------------------- users --------------------*/
  // регистрация пользователей (тренеры)                      !!!!!
  app.post('/api/register', usersController.register); //ok
  // !!!!!!!!!!!!!!!! НЕ РАБОТАЕТ
  app.post('/api/login', usersController.login);
  // вывод всех зарегистрированных пользователей (тренеры)    !!!!!
  app.get('/api/usersList', usersController.listRegister);//ok



  /*-------------------- groups --------------------*/
  // добавить группу к пользователю с id: userId, создать     !!!!!
  app.post('/api/:userId/newGroup', groupsController.create); //ok
  // список групп пользователя с id: userId, создать          !!!!!
  app.get('/api/:userId/groupList', groupsController.list); //ok
  // добавить спортсмена в группу с id группы: groupId        !!!!!
  app.post('/api/:group_id/newParticipant', groupsController.addParticipant); //ok
  // поиск спортсмена по имя-фамилия БЕЗ id группы: groupId        !!!!!
  app.get('/api/findParicipant', groupsController.findParticipant); //ok


  /*---------- filters ----------*/
  // создать фильтр
  app.post('/api/newFilters', filtersController.create); //
  // список всех фильтров
  app.get('/api/listFilter', filtersController.listFilter); //

  app.get('/api/PlanFilter', filtersController.addPlanToFilter); //
  

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
  


 // app.post('/api/:trainExercise/listManyToMany', plansController.listTrainExercise); //
  
  app.delete('/api/delSportsmen', groupsController.destroyParticipant); //ok

};