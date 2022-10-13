//defino lo necesario para el login 
const express = require('express')
const { Router } = express
const loginRouter = Router()

const session = require('express-session')
const MongoStore = require('connect-mongo')

const Usuarios = require("../daos/modelsMDB/usuarios");

//const FileStore = require('session-file-store')(session)
const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

//parport 
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = require("passport-local").Strategy;


passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});


// termina configuracion passport

loginRouter.use(
  session({
    store: MongoStore.create({
      mongoUrl:
      "mongodb+srv://salo:tako@cluster0.51jwcs4.mongodb.net/test",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    //store: new FileStore({path: "./sesiones", ttl:300, retries:0}),
  
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    // Cookie por 10 minutos
    maxAge: 600000
  }),
  );

 //res.sendFile('loginForm', { root: "pages/"})
  // si iniciamos sesion mostrar el inicio o bienvenida y sino login

  // loginRouter.get('/', (req, res) => {
  //   let user = req.session;
  //   console.log(user.user)
  //   if (req.session.user !==undefined){
  //     res.render('index', { root: "pages/"})
  //   } else {
  //     res.render('loginForm', { root: "pages/"})
  //   }    
  //  })


  // mostrar el formulario de login
  // loginRouter.get('/login', (req, res) => {
  //   let user = req.session;
  //   console.log(user.user)
  //   if (req.session.user !==undefined){
  //     res.sendFile('index.html', { root: "pages/"})
  //   } else {
  //     res.sendFile('loginForm.html', { root: "pages/"})
  //   }    
  //  })


   //recibimos credenciales e iniciar sesion

//    loginRouter.post('/login', (req, res) => {
//     let {user} = req.body;
//   console.log(user)
//  console.log (user == undefined)
//      if (user !==undefined ){
//        req.session.user = user
//        res.redirect(__dirname + '/logueado.html')
//      } else {
//        res.sendFile(__dirname + '/loginForm.html')
//      }    
//     })


loginRouter.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("profileUser", { user });
  } else {
    res.render("login");
  }
})



loginRouter.post(
  "/login",
  passport.authenticate("login", { successRedirect: '/', failureRedirect: "/faillogin" }),
 // routes.postLogin

);


//ruta protegida
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
   return next();
  } else {
    res.redirect("/login");
  }
}

app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
 // res.render("profileUser", { user})
  res.send("<h1>Ruta ok!</h1>"+ JSON.stringify(user));
});

//hasta aqui login


module.exports = loginRouter;