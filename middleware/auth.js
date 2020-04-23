const User = require('../database/models/User')

module.exports = (req, res, next) => {

    //Connectes-toi dans la base des données
    User.findById(req.session.userId, (error, user) => {

        if(error || !user) {
            return res.redirect('/')
        }

        next()
    })

    

    // Verifies le user

    // S'il est dans la base des données

     // Sinon tu le rediriges
}