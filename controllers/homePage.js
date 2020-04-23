
//Post
const Post = require("../database/models/Article") 


module.exports =  async(req,res) => {
    
    const posts = await Post.find({})
                            .sort({"created_at": 1})
          console.log(req.session);
          
        // console.log(posts);
    res.render("index", {posts})
//  correpsond à ça => res.render("index", {posts : posts})
}