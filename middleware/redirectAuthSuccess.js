const User = require('../database/models/User')

module.exports = function(req, res, next) {
       
    
        if(req.session.userId) {

            return res.redirect('/article/add')
        }

        next()
}

