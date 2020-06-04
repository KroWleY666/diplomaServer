const config = require('../config/auth.js');
const ROLEs = config.ROLEs; 

const User = require('../models').User

checkDuplicateUserNameOrEmail = (req, res, next) => {
    // -> Check Username is already in use
    /*User.findOne({
      where: {
        username: req.body.username
      } 
    }).then(user => {
      if(user){
        res.status(400).send("Fail -> Username is already taken!");
        return;
      }*/
      
      // -> Check Email is already in use
      //console.log(`${req.body.email}`)
      User.findOne({ where: { email: req.body.email }})
      .then(user => {
        if(user){
          res.status(400).send("Ошибка! Такая почта уже используется!!");
          return;
        }
        next();
      });
    //}
    //);
  }

  checkRolesExisted = (req, res, next) => {  
    if (req.body.roles) {
    for(let i=0; i<req.body.roles.length; i++){
      if(!ROLEs.includes(req.body.roles[i]/*.toUpperCase()*/)){
        res.status(400).send("Ошибка! Не существует роли = " + req.body.roles[i]);
        return;
      }
    }
  }
    next();
  }
   
  const verifySignUp = {};
  verifySignUp.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
  verifySignUp.checkRolesExisted = checkRolesExisted;
   
  module.exports = verifySignUp;