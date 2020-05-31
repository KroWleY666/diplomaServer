const jwt = require('jsonwebtoken');
const config = require('../config/roles.js');


//const db = require('../models/index.js');
const User = require('../models').User
const Role = require('../models').Role

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    
    if (!token){
      return res.status(403).send({ 
        auth: false, message: 'No token provided.' 
      });
    }
   
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err){
        return res.status(500).send({ 
            auth: false, 
            message: 'Fail to Authentication. Error -> ' + err 
          });
      }
      req.user_id = decoded.user_id;
      next();
    });
  }

  isAdmin = (req, res, next) => {
  
    User.findByPk(req.user_id)
      .then(user => {
        user.getRoles().then(roles => {
          for(let i=0; i<roles.length; i++){
            console.log(roles[i].role_name);
            if(roles[i].role_name.toUpperCase() === "ADMIN"){
              next();
              return;
            }
          }
          
          res.status(403).send("Require Admin Role!");
          return;
        })
      })
  }
   
  isPmOrAdmin = (req, res, next) => {
    
    User.findByPk(req.user_id)
      .then(user => {
        user.getRoles().then(roles => {
          for(let i=0; i<roles.length; i++){          
            if(roles[i].role_name.toUpperCase() === "TRAINER"){ //PM
              next();
              return;
            }
            
            if(roles[i].role_name.toUpperCase() === "SPORTSMEN"){
              next();
              return;
            }
          }
          
          res.status(403).send("Require Trainer or Sportsmen Roles!");
        })
      })
  }
   
  const authJwt = {};
  authJwt.verifyToken = verifyToken;
  authJwt.isAdmin = isAdmin;
  authJwt.isPmOrAdmin = isPmOrAdmin;
   
  module.exports = authJwt;