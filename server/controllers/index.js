/*---------- ----------*/
// используем в ('./routes/index')

const roles = require('./roles')
const userRoles = require('./userroles')
const users = require('./users')
const groups = require('./groups')
const filters = require('./filters')
const plans = require('./plans')
const exercises = require('./exercises')
//const participants = require('./participants')

module.exports = {
    roles,
    userRoles,
    users,
    groups,
    filters,
    plans,
    exercises,
  //  participants
}