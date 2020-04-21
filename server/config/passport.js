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
                if (!user) return done(null, false, { message: 'Пользователь не найден'})
                /*var hashedPassword =*/ bcrypt.compare(password, user.salt, (err, isMatch) => { //compare
                  if (err) throw err;
                 /* if (user.password === hashedPassword) {
                    return done(null, user)
                  } else {*/
                    if (isMatch) return done(null, user);
                    else return done(null, false, {message: 'Неправильный пароль'}) 
                  })
            })
        })),

    console.log("passport is working");
    passport.serializeUser((user, done) => {
        console.log("Serialize");
        return done(null, user.user_id);
        //
    });

    passport.deserializeUser((user_id, done) => {
        console.log("DeSerialize");
        User.findByPk(user_id).then(user => {
            console.log(user);
            return done(null, user);
        })
    })
};
