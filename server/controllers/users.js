//const UserRole = require('../models').UserRole;
const User = require('../models').User
const bcrypt = require('bcryptjs')
const passport = require('passport')

module.exports = {

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