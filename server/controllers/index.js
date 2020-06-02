/*---------- ----------*/
// используем в ('./routes/index')

const roles = require('./roles')
const userRoles = require('./userroles')
const users = require('./users')
const groups = require('./groups')
const filters = require('./filters')
const plans = require('./plans')
const exercises = require('./exercises')
const events = require('./events')
const participants = require('./participants')
const trains = require('./trains')
const analytics = require('./analytics')

module.exports = {
    roles,
    userRoles,
    users,
    groups,
    filters,
    plans,
    exercises,
    events,
    participants,
    trains,
    analytics
}