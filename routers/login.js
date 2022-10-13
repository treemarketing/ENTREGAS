//defino lo necesario para el login 
const express = require('express')
const { Router } = express
const loginRouter = Router()

const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require("mongoose");
const Usuarios = require("../daos/modelsMDB/schemaUsuarios");

//const FileStore = require('session-file-store')(session)
const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

//passport 
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = require("passport-local").Strategy;


//bcrypt 
const bcrypt = require("bcrypt");
function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

//fin bcrypt

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Connected to DB"))
  .catch((e) => {
    console.error(e);
    throw "can not connect to the db";
  });







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

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log(user);
          console.log("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

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

loginRouter.get('/', checkAuthentication ,(req, res) => {
  res.render("pages/index", {});
})

loginRouter.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("pages/profileUser", { user });
  } else {
    res.render("pages/loginForm");
  }
})

loginRouter.get('/faillogin', (req, res) => {
  res.render("pages/login-error", {});
})


loginRouter.post(
  "/login",
  passport.authenticate("login", { successRedirect: '/api/', failureRedirect: "/api/faillogin" }),
 // routes.postLogin

);

loginRouter.get('/signup', (req, res) => {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("pages/profileUser", { user });
  } else {
    res.render("pages/signup");
  }
})


loginRouter.get('/failsignup', (req, res) => {
  res.render("pages/signup-error", {});
})


loginRouter.post(
  "/signup",
  passport.authenticate("/api/signup", { failureRedirect: "/api/failsignup" }),
  //routes.postSignup
);


loginRouter.post('/signup', (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("pages/profileUser", { user });
})


loginRouter.get('/logout', (req, res) => {
  req.logout();
  res.render("pages/index");
})


//ruta protegida
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
   return next();
  } else {
    res.redirect("/api/login");
  }
}

// app.get("/", checkAuthentication, (req, res) => {
//   const { username, password } = req.user;
//   const user = { username, password };
//  // res.render("profileUser", { user})
//   res.send("<h1>Ruta ok!</h1>"+ JSON.stringify(user));
// });





//hasta aqui login


module.exports = loginRouter;