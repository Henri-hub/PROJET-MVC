const mongoose = require('mongoose')
const Article = require('./database/models/Article')

mongoose.connect('mongodb://localhost:27017/blog-test');


/*
Article.findByIdAndUpdate("5e7d9e2536da921e5ad8b16e", 
{title: 'Avenger EndGame'}, (error, post) => {
      console.log(error, post);
      
})
*/

/*Article.findById("5e7d9e2536da921e5ad8b16e", (error, articles) => {
      console.log(error, articles);
      
})
*/

/*Article.find({

    intro: 'test d\'introduction'

}, (error, articles) => {
    console.log(error, articles);
    
})
*/
/*
Article.create({
    title: "SpiderMan",
    intro: "test d'introduction",
    content: "Critique sur le film Spiderman"
}, (error, post) => {
      console.log(error, post);
      
})
*/

