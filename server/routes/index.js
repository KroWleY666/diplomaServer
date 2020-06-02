// файлы для регистрации, токен, роли пользователей
const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

// список контроллеров
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
const analyticsController = require('../controllers').analytics;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.delete('/api/delPN', userRolesController.destroyParam);
 
  // регистрация *************ПО ТОКЕНАМ*************
  app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], usersController.signup);
  // вход зареганного
  app.post('/api/auth/signin', usersController.signin);
  
  app.get('/api/test/user', [authJwt.verifyToken], usersController.userContent);
  
  app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], usersController.managementBoard);
  
  app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], usersController.adminBoard);


  // регистрация *************ПО PASSPORT*************
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









  /*-------------------- ВСЕ БЕЗ РЕГИСТРАЦИИ !!!!!!!!!!--------------------*/

  /*-------------------- добавление/просмотр/удаление groups --------------------*/

  
  // добавить группу                                                                !!!!!
  app.post('/api/newGroup', groupsController.createGroup); //ok
  // удалить группу                                                                 !!!!!
  app.delete('/api/delGroup/:group_id', groupsController.destroyGroup); //ok
  // список групп                                                                   !!!!!
  app.get('/api/groupList', groupsController.listGroups); //ok


  /*-------------------- добавление/просмотр/удаление group participants --------------------*/


  // добавить спортсмена в группу с id группы                                       !!!!!
  app.post('/api/newParticipant', groupsController.addParticipant); //ok
  // удалить спортсмена из группы                                                   !!!!!
  app.delete('/api/delSportsmen/:participant_id', groupsController.destroyParticipant); //ok


  /*-------------- добавление/просмотр/удаление standarts, parameters, events --------------*/

  /*---------- НОРМАТИВ Standart ----------*/

  // создать НОРМАТИВ с id спортсмена                                               !!!!!
  app.post('/api/newStandart/:participant_id', participantsController.createStandart); // ok
  // все названия НОРМАТИВОВ                                                        !!!!!
  app.get('/api/listStandarts', participantsController.listStandarts); // ok 
  // создать НОРМАТИВ отдельно для id спортсмена                                     !!!!!
  app.get('/api/listPartStandart/:participant_id', participantsController.listPartStandart); // ok   
  // удалить НОРМАТИВ по id                                                         !!!!!
  app.delete('/api/delStandart/:standart_id', participantsController.destroyStandart); // ok 
  
  /*---------- ИЗМЕРЕНИЕ Parameter ----------*/

  // создать ИЗМЕРЕНИЕ с id спортсмена                                              !!!!!
  app.post('/api/newParameter/:participant_id', participantsController.createParameter); // ok
  // все названия ИЗМЕРЕНИЙ                                                        !!!!!
  app.get('/api/listParameters', participantsController.listParameters); // ok 
  // список ИЗМЕРЕНИЙ спортсмена                                                    !!!!!
  app.get('/api/listPartParameter/:participant_id', participantsController.listPartParameter); // ok
  // удалить ИЗМЕРЕНИЕ по id                                                        !!!!!
  app.delete('/api/delParameter/:param_id', participantsController.destroyParameter); // ok  
 

  /*---------- СОБЫТИЕ Event ----------*/

  // создать СОБЫТИЕ с id спортсмена                                                !!!!!
  app.post('/api/newEvent/:participant_id', participantsController.createEvent); // ok
  // список событий                                                                 !!!!!
  app.get('/api/listPartEvent/:participant_id', participantsController.listPartEvent); // ok
  // удалить событие по id                                                          !!!!!
  app.delete('/api/delEvent/:event_id', participantsController.destroyEvent); // ok 



  /*-------------- добавление/просмотр/удаление exercises --------------*/

  /*----------------- exercises -----------------*/

  // создать упражнение без привязки к тренировке             !!!!!
  app.post('/api/newExercises', exercisesController.createExercise); // ok
  // добавить 3 параметра к упражнению (по его id в коде)           !!!!!
  app.post('/api/addCharToExer/:train_id', exercisesController.addCharToExer); // ok
  // удалить упражнение по его id                      !!!!!
  app.delete('/api/delExercise/:exercise_id', exercisesController.destroyExercise); // ok
  // список базы упражнений с характеристиками               !!!!!
  app.get('/api/listExercises', exercisesController.listOnlyExercise); // ok


  // список мышц           !!!!!
  app.get('/api/listMuscle', exercisesController.listMuscle); // ok
  // список типов упражнений           !!!!!
  app.get('/api/listTypeEx', exercisesController.listTypeEx); // ok
  // список мышц id упражнения                                 !!!!!
  app.get('/api/listOneExAndMuscles/:exercise_id', exercisesController.listOneExAndMuscles); // ok 



  /*-------------- добавление/просмотр/удаление trains --------------*/

  /*----------------- trains -----------------*/



  // список id упражнений                                 !!!!!
  app.get('/api/extractExerToTrain/:train_id', exercisesController.extractExerToTrain); // ok   
  // список характеристик одного id упражнения                                 !!!!!
  app.get('/api/extractCharToOneExer', exercisesController.extractCharToOneExer); // ok 
  
  // список уровней           !!!!!
  app.get('/api/listLevelTrain', trainsController.listLevelTrain); // ok
  // список типов тренировок           !!!!!
  app.get('/api/listTypeTrain', trainsController.listTypeTrain); // ok
  

  // создать тренировку отдельно                                 !!!!!
  app.post('/api/newTrain', trainsController.createTrain); // ok 

  // список всех тренировок без моделей                                     !!!!!
  app.get('/api/listTrain', trainsController.listTrain); // ok

  


  /*-------------- аналитика standarts, parameters --------------*/

  // извлечь НОРМАТИВ по его ид и ид спортсмена                                    !!!!!
  app.get('/api/extractStandart/:participant_id/:stn_id', analyticsController.extractStandart); // ok
  // извлечь ПАРАМЕТР по его ид и ид спортсмена                                    !!!!!
  app.get('/api/extractParameter/:participant_id/:pn_id', analyticsController.extractParameter); // ok





  // информация об упражнении БЕЗ тренировки           !!!!!
  app.post('/api/oneExercise', exercisesController.oneExercise); // ok
  // обновить 2 параметра к упражнению (по его id в коде)           !!!!!
  app.put('/api/updateCharToExer/:character_id', exercisesController.updateCharToExer); // ok
  
  app.delete('/api/destroyCharExes', exercisesController.destroyCharExes); // ok
  
  



  /*-------------------- standarts,parameters --------------------*/
      
  
    // получить всю инфу ОДНОГО спортсмена по ИД                    !!!!!
    app.get('/api/listONEPartModels/:participant_id', participantsController.listONEPartModels); // ok
    // получить записи тренировки ОДНОГО спортсмена по ИД                    !!!!!
    app.get('/api/listPartDates/:participant_id', participantsController.listPartDates); // ok
    // получить записи тренировки ОДНОГО спортсмена по ИД                    !!!!!
    //app.get('/api/listALLDates/:participant_id', participantsController.listALLDates); // ok
    
    
  
    

  // поиск спортсмена по имя-фамилия БЕЗ id группы: groupId        !!!!!
  app.get('/api/findParicipant', groupsController.findParticipant); //ok

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


  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //app.get('/api/listOneTrain/:train_id', plansController.listOneTrain); // ok

  

  /*----------------- M:M planes,trains,exercises -----------------*/
  // добавить в план тренировки(создать трентровку в ид плана)         !!!!!
  app.post('/api/newTrainToPlan', plansController.addTrainToPlan); //ok 
  // добавить в тренировку упражнение(добавить ид упражнения в ид тренировки)         !!!!! 
  app.post('/api/newExerciseToTrain/:train_id', exercisesController.addExerciseToTrain); // ok

  // удалить план по его id                      !!!!!
  app.delete('/api/delPlan/:plan_id', plansController.destroyPlan); // ok



  /*-------------- добавление/просмотр/удаление exercises --------------*/

  

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





  /*-------------------- trains,datetrain --------------------*/



  // удалить тренировку по ее id                      !!!!!
  app.delete('/api/delTrain/:train_id', trainsController.destroyTrain); // ok
  

  // создать событие отдельно                    !!!!!
  app.post('/api/newDateTrain/:participant_id', trainsController.createDT); // ok

  // список всех тренировок без моделей                                     !!!!!
  app.get('/api/allDateTrainsInfo/:participant_id', trainsController.allDateTrainsInfo); // ok
  

  // создать событие отдельно                    !!!!!
  //app.post('/api/createDT/:participant_id', trainsController.createDT); // не работает
  

  // создать событие отдельно                    !!!!!
 // app.post('/api/updateDateTrain', trainsController.updateDateTrain); // ok


 app.get('/api/allTrainExercisesInfo/:train_id', trainsController.allTrainExercisesInfo); // ok



  // 
  //берем параметром id тренировки и получаем список ее id упражнений 
 // app.delete('/api/listTrainWithExercise', trainsController.listTrainWithExercise); // ok
  //
  
 // app.get('/api/reternEventsOfGroup222/:group_id', eventsController.reternEventsOfGroup); // ok
  





 app.get('/api/listMuscle', filtersController.listMuscle); // ok


 app.get('/api/listTypeEx', filtersController.listTypeEx); // ok



};