/*---------- ----------*/
// используем в ('./routes/index')

const roles = require('./roles')
const userRoles = require('./userroles')
const users = require('./users')
const groups = require('./groups')

module.exports = {
    roles,
    userRoles,
    users,
    groups
}