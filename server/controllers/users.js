const UserRole = require('../models').UserRole;
const User = require('../models').User
const bcrypt = require('bcryptjs')
const passport = require('passport')

module.exports = {
    register(req, res){
        
    let errors = []
    
    if (req.body.password !== req.body.password2) {
        errors.push({ text: 'Пароли не совпадают' })
    }
    if (req.body.password.length < 4) {
        errors.push(({ text: 'Длина пароля должна быть не меньше 4' }));
    }
    /*if (errors.length > 0) {
        res.render('user/register', {
            errors: errors,
            name: req.body.name,
            surname: req.body.surname,
            role: req.body.role,
            sex: req.body.sex,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    }*/
    else {
        User.findOne({ where: { email: req.body.email } })
            //.lean()
            .then(user => {
                if (user) {
                    //req.flash('error_msg', 'Такой логин уже зарегистрирован')
                    console.log("Такая почта уже зарегистрирована")
                    res.status(400).send(user)
                    //res.redirect('/user/login');
                }
                else {
                    const newUser = new User({
                        name: req.body.name,
                        surname: req.body.surname,
                        role: req.body.role,
                        email: req.body.email,
                        password: req.body.password
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    //req.flash('success_msg', 'Вы зарегистрировались')
                                    console.log("Вы зарегистрировались")
                                    //res.redirect('/api');
                                    return res.status(200).send(user);
                                    //return newUser
                                })
                                .catch(err => {
                                    console.log(err);
                                    return;
                                });
                        });
                    });
                }
            })
    }

    },

    list(req, res) {
        return User
          .findAll()//ByPk(req.params.user_id)
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'Todo Not Found',
              });
            }
            return res.status(200).send(user);
          })
          .catch((error) => res.status(400).send(error));
        },
    
    login(req, res) {
        passport.authenticate('local', {        
            //successRedirect: '/',
            //failureRedirect: '/user/login',
            failureFlash: true
        })(req, res, next); //
        console.log('прошли log')
        let errors = [];
    }
}