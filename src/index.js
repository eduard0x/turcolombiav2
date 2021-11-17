const express = require('express');
const morgan = require('morgan');
const app = express();
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

//Settings
app.set('port',process.env.PORT || 3001);
require('./database');
require('./config/passport');

//Middlewares
app.use(morgan('dev'));
//Each time is received a json format, the navigator can understand it.
app.use(express.json())

app.use(session({
    secret:'mySecretApp',
    resave:true,
    saveUninitialized:true
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/vehiculos',require('./routes/vehiculos'))
app.use('/usuarios',require('./routes/usuarios'))
//Static files
//Add route of folder where is our static files(public folder)

//Public folder is sent at browser
app.use(express.static(__dirname + '/public'))







//Server is listening

app.listen(app.get('port'),()=>{
    console.log("Server on port "+app.get('port'))
})
