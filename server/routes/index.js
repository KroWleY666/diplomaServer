const rolesController = require('../controllers').roles;
const userRolesController = require('../controllers').userRoles;
const usersController = require('../controllers').users;
const groupsController = require('../controllers').groups;
const filtersController = require('../controllers').filters;
const exercisesController = require('../controllers').exercises;
const plansController = require('../controllers').plans;
const eventsController = require('../controllers').events;
const participantsController = require('../controllers').participants;
const trainsController = require('../controllers').trains;

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
  // !!!!!!!!!!!!!!!! ПРОВЕРИТЬ В КЛИЕНТЕ
  app.post('/api/login', usersController.login);
  // вывод всех зарегистрированных пользователей (тренеры)    !!!!!
  // !!!!!!!!!!!!!!!!  ПРОВЕРИТЬ В КЛИЕНТЕ
  app.get('/api/logout', usersController.logout);
  
  app.get('/api/usersList', usersController.listRegister);//ok



  /*-------------------- groups --------------------*/
  // добавить группу к пользователю с id: userId, создать     !!!!!
  app.post('/api/:userId/newGroup', groupsController.create); //ok
  // список групп пользователя с id: userId, создать          !!!!!  req.user?????
  app.get('/api/groupList', groupsController.list); //ok
  // добавить спортсмена в группу с id группы: groupId        !!!!!
  app.post('/api/newParticipant', groupsController.addParticipant); //ok
  // поиск спортсмена по имя-фамилия БЕЗ id группы: groupId        !!!!!
  app.get('/api/findParicipant', groupsController.findParticipant); //ok
  // удалить спортсмена из группы                             !!!!!
  app.delete('/api/delSportsmen/:participant_id', groupsController.destroyParticipant); //ok
  // удалить группу                                           !!!!!
  app.delete('/api/delGroup/:group_id', groupsController.destroyGroup); //ok
  // вывод ВСЕХ спортсменов и их id групп                    !!!!!
  app.get('/api/listPartWithGroup', participantsController.listPartWithGroup); // ok
  


  /*-------------------- filters --------------------*/
  // создать фильтр просто                                         !!!!!
  app.post('/api/newFilters', filtersController.create); //ok
  // список всех фильтров c привязанными к ним планами             !!!!!
  app.get('/api/listFilter', filtersController.listFilter); //ok
  // привязка плана(создается здесь же) к id фильтра               !!!!!
  app.get('/api/PlanFilter', filtersController.addPlanToFilter); //ok
  // удалить фильтр с привязанными к нему планами                  !!!!!
  app.post('/api/delPlanFilter', filtersController.destroyFilter); //ok
  


  /*----------------- planes -----------------*/
  // создать план отдельно                                 !!!!!
  app.post('/api/newPlan', plansController.create); // ok
  // список планов с привязанными к ним фильтрами и тренировками         !!!!!
  app.get('/api/listPlan', plansController.listPlan); // ok
  // создать тренировку отдельно                                 !!!!!
  app.post('/api/newTrain', plansController.createTrain); // ok 
  // список тренировок                                     !!!!!
  app.get('/api/listTrain', plansController.listTrain); // ok

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  app.get('/api/listOneTrain/:train_id', plansController.listOneTrain); // ok

  

  /*----------------- M:M planes,trains,exercises -----------------*/
  // добавить в план тренировки(создать трентровку в ид плана)         !!!!!
  app.post('/api/newTrainToPlan', plansController.addTrainToPlan); //ok 
  // добавить в тренировку упражнение(добавить ид упражнения в ид тренировки)         !!!!! 
  app.post('/api/newExerciseToTrain/:train_id', exercisesController.addExerciseToTrain); // ok
  // удалить тренировку по ее id                      !!!!!
  app.delete('/api/delTrain/:train_id', plansController.destroyTrain); // ok
  // удалить план по его id                      !!!!!
  app.delete('/api/delPlan/:plan_id', plansController.destroyPlan); // ok





  /*----------------- exercises -----------------*/
  // создать упражнение без привязки к тренировке             !!!!!
  app.post('/api/newExercises', exercisesController.create); // ok
  // список всех упражнений с зависимыми тренировками         !!!!!
  app.get('/api/listExercises', exercisesController.listExercise); // ok
  // удалить упражнение по его id                      !!!!!
  app.delete('/api/delExercise/:exercise_id', exercisesController.destroyExercise); // ok
  // информация об упражнении БЕЗ тренировки           !!!!!
  app.post('/api/oneExercise', exercisesController.oneExercise); // ok
  // добавить 3 параметра к упражнению (по его id в коде)           !!!!!
  app.post('/api/addCharToExer', exercisesController.addCharToExer); // ok
  // список только упражнений, без других моделей           !!!!!
  app.get('/api/listOnlyExercise', exercisesController.listOnlyExercise); // ok
  // обновить 2 параметра к упражнению (по его id в коде)           !!!!!
  app.put('/api/updateCharToExer/:character_id', exercisesController.updateCharToExer); // ok
  


  


  /*-------------------- events --------------------*/
  // создать событие отдельно                    !!!!!
  app.post('/api/newEvent', eventsController.create); // ok
  // список событий и групп для них                    !!!!!
  app.get('/api/listEvent', eventsController.listEvent); // ok
  // создать событие в группу                    !!!!!

  app.post('/api/newEventToGroup', eventsController.addEventToGroup); // ok
  // удалить событие по id                       !!!!!
  app.delete('/api/delEvent/:event_id', eventsController.destroyEvent); // ok  

  // список событий ОДНОГО СПОРСМЕНА                    !!!!!

  app.get('/api/listParticEvent/:group_id', eventsController.listParticEvent); // ok
  
  app.get('/api/listParticEvent222/:group_id', eventsController.listParticEvent222);
  
  // список событий ОДНОГО СПОРСМЕНА                    !!!!!
  //app.post('/api/addEventToGroup', eventsController.addEventToGroup); // ok



  /*-------------------- standarts,parameters --------------------*/
  // создать НОРМАТИВ с id спортсмена                    !!!!!
  app.post('/api/newStandart/:participant_id', participantsController.createStandart); // ok
  // создать ИЗМЕРЕНИЕ с id спортсмена                     !!!!!
  app.post('/api/newParameter/:participant_id', participantsController.createParameter); // ok
  // создать СОБЫТИЕ с id спортсмена                     !!!!!
  app.post('/api/newEvent/:participant_id', participantsController.createEvent); // ok

  // получить всю инфу ОДНОГО спортсмена по ИД                    !!!!!
  app.get('/api/listONEPartModels/:participant_id', participantsController.listONEPartModels); // ok
  // получить записи тренировки ОДНОГО спортсмена по ИД                    !!!!!
  app.get('/api/listPartDates/:participant_id', participantsController.listPartDates); // ok
  // получить записи тренировки ОДНОГО спортсмена по ИД                    !!!!!
  //app.get('/api/listALLDates/:participant_id', participantsController.listALLDates); // ok
  
  

  
  // удалить измерение по id                       !!!!!
  app.delete('/api/delParameter/:param_id', participantsController.destroyParameter); // ok  
  // удалить норматив по id                       !!!!!
  app.delete('/api/delStandart/:standart_id', participantsController.destroyStandart); // ok  
  // удалить событие по id                       !!!!!
  app.delete('/api/delEvent/:event_id', participantsController.destroyEvent); // ok  
  

  
   // создать событие отдельно                    !!!!!
   app.get('/api/listPartStandart/:participant_id', participantsController.listPartStandart); // ok
   // список событий и групп для них                    !!!!!
   app.get('/api/listPartParameter/:participant_id', participantsController.listPartParameter); // ok
 
   // список событий и групп для них                    !!!!!
   app.get('/api/listPartEvent/:participant_id', participantsController.listPartEvent); // ok
 


  /*-------------------- trains,datetrain --------------------*/
  // создать событие отдельно                    !!!!!
  app.post('/api/newDateTrain/:participant_id', trainsController.createDT); // ok
  
  // создать событие отдельно                    !!!!!
  //app.post('/api/createDT/:participant_id', trainsController.createDT); // не работает
  

  // создать событие отдельно                    !!!!!
 // app.post('/api/updateDateTrain', trainsController.updateDateTrain); // ok


 app.get('/api/allTrainExercisesInfo/:train_id', trainsController.allTrainExercisesInfo); // ok



  // 
  //берем параметром id тренировки и получаем список ее id упражнений 
  app.get('/api/listTrainWithExercise/:train_id', trainsController.listTrainWithExercise); // ok
  //

  // проверка связки моделей НЕ РАБОТАЕТ(не требуется вроде)
  app.get('/api/PlanAndFilterCheck', filtersController.PlanAndFilter); //
  

  
  app.get('/api/reternEventsOfGroup222/:group_id', eventsController.reternEventsOfGroup); // ok
  
};