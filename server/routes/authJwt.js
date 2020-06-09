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
            auth: false,  message: 'Неавторизированный пользователь! ' + err 
          });
      }
      req.user_id = decoded.user_id;
      next();
    });
  }
  
  isTrainer = (req, res, next) => {
    User.findByPk(req.user_id)
      .then(user => {
            if(user.role_id === 1){
              next();
              return;
            }
          res.status(403).send({message: "Требуется роль Тренера!"});
          return;
      })
  }

  isSportsmen = (req, res, next) => {
    User.findByPk(req.user_id)
      .then(user => {
            if(user.role_id === 2){
              next();
              return;
            }
          res.status(403).send({message: "Требуется роль Спортсмена!"});
          return;
        })
  }
   
  isTrOrSp = (req, res, next) => {
    User.findByPk(req.user_id)
      .then(user => {        
            if(user.role_id === 1){ 
              next();
              return;
            }
            
            if(user.role_id=== 2){
              next();
              return;
            }
          res.status(403).send({message: "Требуется роль Тренера или Спортсмена!"})
      })
  }
   
  const authJwt = {};
  authJwt.verifyToken = verifyToken;
  authJwt.isSportsmen = isSportsmen;
  authJwt.isTrainer = isTrainer;
  authJwt.isTrOrSp = isTrOrSp;
   
  module.exports = authJwt;