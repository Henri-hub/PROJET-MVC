const bcrypt = require('bcrypt');
const User = require('../database/models/User')

module.exports = (req, res) => {
   
    const { email, password} = req.body;

    User.findOne({email},(error, user) => {

        if(user) {
           
            bcrypt.compare(password, user.password, (error, same) => {

                 req.session.userId = user._id

                if(same) {
                   res.redirect('/')

                } else {
                    res.redirect('/')
                }
            })

        } else {
             return res.redirect('/user/login')
        }

        
    })
    
    
}