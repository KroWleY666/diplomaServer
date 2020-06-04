const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const User = require('../models').User

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    
    if (!token){
      return res.status(403).send({ 
        auth: false, message: 'Нет токена.' 
      });
    }
   
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err){
        return res.status(401).send({ 
            auth: false, 
            message: 'Неавторизированный пользователь! ' + err 
          });
      }
      req.user_id = decoded.user_id;
      next();
    });
  }

  isSportsmen = (req, res, next) => {
  
    User.findByPk(req.user_id)
      .then(user => {
        user.getRoles().then(roles => {
          for(let i=0; i<roles.length; i++){
           // console.log(roles[i].role_name);
            if(roles[i].role_name/*.toUpperCase()*/ === "SPORTSMEN"){
              next();
              return;
            }
          }
          
          res.status(403).send({message: "Требуется роль Спортсмена!"});
          return;
        })
      })
  }
  
  isTrainer = (req, res, next) => {
  
    User.findByPk(req.user_id)
      .then(user => {
        user.getRoles().then(roles => {
          for(let i=0; i<roles.length; i++){
           // console.log(roles[i].role_name);
            if(roles[i].role_name/*.toUpperCase()*/ === "TRAINER"){
              next();
              return;
            }
          }
          
          res.status(403).send({message: "Требуется роль Тренера!"});
          return;
        })
      })
  }
   
  isTrOrSp = (req, res, next) => {
    
    User.findByPk(req.user_id)
      .then(user => {
        user.getRoles().then(roles => {
          for(let i=0; i<roles.length; i++){          
            if(roles[i].role_name/*.toUpperCase()*/ === "TRAINER"){ //PM
              next();
              return;
            }
            
            if(roles[i].role_name/*.toUpperCase()*/ === "SPORTSMEN"){
              next();
              return;
            }
          }
          
          res.status(403).send({message: "Требуется роль Тренера или Спортсмена!"})
        })
      })
  }
   
  const authJwt = {};
  authJwt.verifyToken = verifyToken;
  authJwt.isSportsmen = isSportsmen;
  authJwt.isTrainer = isTrainer;
  authJwt.isTrOrSp = isTrOrSp;
   
  module.exports = authJwt;