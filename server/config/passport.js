const LocalStrategy = require('passport-local').Strategy;
//const  = require('mongoose');
const bcrypt = require('bcryptjs');

//const User = mongoose.model('users');
const User = require('../models').User

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            User.findOne({
                where: { email: email }
            }).then(user => {
                if (!user) return done(null, false, {message: 'Пользователь не найден'})
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) return done(null, user);
                    else return done(null, false, {message: 'Неправильный пароль'})
                })
            })
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });

    passport.deserializeUser((user_id, done) => {
        User.findByPk(user_id, (err, user) => {
            done(err, user);
        })
    })
};
