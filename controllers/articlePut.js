const Post = require("../database/models/Article")

const path       = require('path');

module.exports = (req, res) => {

    const { image } = req.files

    const uploadFile = path.resolve(__dirname, '..' ,'public/articles', image.name)
    
        image.mv(uploadFile, (error) => {

    Post.update(
        //Condition
           {_id: req.params.id},
        //update
           {
             title: req.body.title,
             content: req.body.content,
             author: req.body.author,
             image : `/articles/${image.name}`

           },
        //option
           {multi: true},
        //execution
        function(err) {
          if(!err) {
            res.redirect("/")
          } else {
            res.send(err)
          }
        }

      )})
    
};