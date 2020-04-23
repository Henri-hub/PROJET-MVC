const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const connectFlash = require('connect-flash');
const {stripTags} = require('./helpers/hbs');
const methodeOverride = require('method-override');



// Controller //
  //=> article
const articleAddController = require('./controllers/articleAdd');
const articleSingleController = require('./controllers/articleSingle');
const articlePostController = require('./controllers/articlePost');
const homePageController = require('./controllers/homePage');
const articleDeleteController = require('./controllers/articleDelete')
const articlePutController = require('./controllers/articlePut')
const articleEditController = require('./controllers/articleEdit')
  //=> user
const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin  = require('./controllers/userLogin')  
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')

const auth = require ("./middleware/auth");
const redirectAuthSuccess = ("./middleware/redirectAuthSuccess");


const app = express();

//MethodeOverride
app.use(methodeOverride("_method"));

//MongoDB
const db = require('./config/keys').MongoURI
mongoose
       .connect(db,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
       .then(() => console.log('Connecter à MongoDB Cloud'))
       .catch(err => console.log(err));

const mongoStore = MongoStore(expressSession)

app.use(connectFlash())

app.use(expressSession({
       
       secret: 'securite',
       name: 'biscuit',
       saveUninitialized: true,
       resave: false,

       store: new mongoStore(
         {mongooseConnection: mongoose.connection}
       )
       
}))



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(fileupload())







var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);



app.use(express.static('public'));

//Route
app.engine('handlebars', exphbs({
   helpers : {
     stripTags : stripTags
   },
  defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => {

   res.locals.user = req.session.userId;
   console.log(res.locals.user);
   next()
   
})


//Middleware
const articleValidPost = require('./middleware/articleValidPost') 
app.use("/articles/post", articleValidPost)






app.get ("/", homePageController)




// Articles

app.get ("/articles/add", auth, articleAddController)

app.get( "/articles/:id", articleSingleController)

app.post("/articles/post", auth, articleValidPost, articlePostController)

app.delete("/articles/:id", auth, articleDeleteController)
app.get("/article/edit/:id", auth, articleEditController)
app.put("/article/edit/:id", auth, articlePutController)

// Users
app.get ('/user/create', userCreate)
app.post('/user/register', userRegister)
app.post('/user/loginAuth', userLogin, userLoginAuth)
app.get('/user/logout', userLogout)


//Contact
app.get ("/contact", (req, res) => {
  res.render("contact")
})

app.use((req, res) => {
  res.render('error404')
})




app.listen(6600, function() {
    console.log("le serveur tourne sur le port 6600");
    
})
