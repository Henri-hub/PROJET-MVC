const path       = require('path');
//Post
const Post = require("../database/models/Article")


module.exports = function(req, res)  {
    
    //console.log(req.files);
    const { image } = req.files

    const uploadFile = path.resolve(__dirname, '..' ,'public/articles', image.name)
    
        image.mv(uploadFile, (error) => {

              Post.create(

                {
                  ...req.body,
                  image : `/articles/${image.name}`
                }
                , (error,post) => {
                   res.redirect('/')
              })
        
        })
   
}