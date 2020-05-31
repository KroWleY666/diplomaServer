//const UserRole = require('../models').UserRole;
const User = require('../models').User
const Role = require('../models').Role
const config = require('../config/roles.js');
const bcrypt = require('bcryptjs')

var jwt = require('jsonwebtoken');

const passport = require('passport')

module.exports = {

    signup(req, res) {
        // Save User to Database
        console.log("Processing func -> SignUp");
        
        User.create({
         // name: req.body.name,
         // username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          salt: bcrypt.hashSync(req.body.password, 10)
        }).then(user => {
          Role.findAll({
            where: {
            role_name: 
              /*[Op.or]: */req.body.roles.map(role => role.toUpperCase())
            
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send("User registered successfully!");
                  });
          }).catch(err => {
            res.status(500).send("Error -> " + err);
          });
        }).catch(err => {
          res.status(500).send("Fail! Error -> " + err);
        })
      },

      signin(req, res) {
        console.log("Sign-In");
        
        User.findOne({
          where: {
            email: req.body.email
          }
        }).then(user => {
          if (!user) {
            return res.status(404).send('User Not Found.');
          }
       
          var passwordIsValid = bcrypt.compareSync(req.body.password, user.salt);
          if (!passwordIsValid) {
            return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
          }
          
          var token = jwt.sign({ user_id: user.user_id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          
          res.status(200).send({ auth: true, accessToken: token });
          return { auth: true, accessToken: token }
          
        }).catch(err => {
          res.status(500).send('Error -> ' + err);
        });
      },

      userContent(req, res) {
        User.findOne({
          where: {user_id: req.user_id},
          attributes: ['email'],
          include: [{
            model: Role,
            attributes: ['role_id', 'role_name'],
            through: {
              attributes: ['user_id', 'role_id'],
            }
          }]
        }).then(user => {
          res.status(200).json({
            "description": "User Content Page",
            "user": user
          });
        }).catch(err => {
          res.status(500).json({
            "description": "Can not access User Page",
            "error": err
          });
        })
      },

      adminBoard (req, res) {
        User.findOne({
            where: {user_id: req.user_id},
            attributes: ['email'],
            include: [{
              model: Role,
              attributes: ['role_id', 'role_name'],
              through: {
                attributes: ['user_id', 'role_id'],
              }
          }]
        }).then(user => {
          res.status(200).json({
            "description": "Admin Board",
            "user": user
          });
        }).catch(err => {
          res.status(500).json({
            "description": "Can not access Admin Board",
            "error": err
          });
        })
      },

      managementBoard(req, res) {
        User.findOne({
            where: {user_id: req.user_id},
            attributes: ['email'],
            include: [{
              model: Role,
              attributes: ['role_id', 'role_name'],
              through: {
                attributes: ['user_id', 'role_id'],
              }
          }]
        }).then(user => {
          res.status(200).json({
            "description": "Management Board",
            "user": user
          });
        }).catch(err => {
          res.status(500).json({
            "description": "Can not access Management Board",
            "error": err
          });
        })
      },
















    /*--------регистрация участников системы--------*/
    register(req, res){
    let errors = []
    //проверка на корректность ввода
    if (req.body.password !== req.body.salt) {
        errors.push({ text: 'Пароли не совпадают' })
        res.status(400).send(errors)
    }
    if (req.body.password.length < 4) {
        errors.push(({ text: 'Длина пароля должна быть не меньше 4' }));
        res.status(400).send(errors)
    }
    else {
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                //проверка есть ли такая почта в бд
                if (user) {
                   // console.log("Такая почта уже зарегистрирована!")
                    return res.status(404).send({
                        message: 'Такая почта уже зарегистрирована!'
                      }); 
                    //res.redirect('/user/login');
                }
                else {
                    User.create({
                        email: req.body.email,
                        password: req.body.password,
                        salt: req.body.salt
                    }).then(user => {
                        //хэшируем пароли  
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(user.salt, salt, (err, hash) => {
                                if (err) throw err;
                                user.salt = hash; //.password
                                user.save()
                                    .then(user => {
                                       // console.log("Вы зарегистрировались")
                                        //res.redirect('/api');
                                        return res.status(200).send(user);
                                    })
                                    .catch(error => res.status(400).send(error));
                            });
                        });
                    })               
                }
            })
            .catch(error => res.status(400).send(error));
        }
    },

    /*--------список всех пользователей зарегистрированных--------*/
    listRegister(req, res) {
        return User
          .findAll()//ByPk(req.params.user_id)
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'Пользователи не найдены! Вообще никого нет в системе...',
              });
            }
            return res.status(200).send(user);
          })
          .catch((error) => res.status(400).send(error));
        },

    /*--------вход в систему--------*/
    login(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/api/groupList',
            failureRedirect: '/users/login'//,
           // failureFlash: true
        })//(req, res, next);


        User.findOne({
            where: { email: req.body.email }
        }).then(user => {
            if (!user) {  res.status(404).send( {message: 'Пользователь не найден'})}
            
            bcrypt.compare(req.body.password, user.salt, (err, isMatch) => {
            //    console.log(`${req.body.password}, ${user.salt}`)
                if (err) throw err;
                if (isMatch) return res.status(200).send(user);
             else 
                res.status(404).send( {message: 'Неверный пароль'})
            })
            })
            .catch((error) => res.status(400).send(error));
    },
    
    /*--------выход из системы--------*/
    logout(req, res) {//, next
        req.logout();
        res.status(200).send({
          //  url:'/profile',
            message: 'Пользователь вышел из системы',
        })
    }
}