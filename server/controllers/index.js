/*---------- ----------*/
// используем в ('./routes/index')

const roles = require('./roles')
const userRoles = require('./userroles')
const users = require('./users')
const groups = require('./groups')
const files = require('./files')
const exercises = require('./exercises')
const events = require('./events')
const participants = require('./participants')
const trains = require('./trains')
const analytics = require('./analytics')
const filetwo = require('./filetwo')

module.exports = {
    roles,
    userRoles,
    users,
    groups,
    files,
    exercises,
    events,
    participants,
    trains,
    analytics,
    filetwo
}