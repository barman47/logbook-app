const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');

const config = require('./config/database');
const students = require('./routes/students');
const supervisor = require('./routes/supervisors');

const publicPath = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;

mongoose.connect(config.database, {
    useNewUrlParser: true
});

let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to Mongo Database on mongodb://localhost:27017');
});

db.on('error', (err) => {
    console.log(err);
});

const app = express();

app.use(express.static(publicPath));
app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized:true
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Passport config
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
//exphbs.registerPartials(__dirname + '/views/partials');
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/students', students);
app.use('/supervisors', supervisor);

app.use((req, res, next) => {
    res.locals.success_message = req.flash('success');
    res.locals.failure_message = req.flash('failure');
    next();
});

app.get('/', (req, res) => {
    res.render('home', {
        title: 'E-Loggbook | Home',
        style: 'css/index.css',
        script: 'js/script.js',    
    });
}); 

app.listen(PORT, () => {
    console.log(`Server is up and running on http://127.0.0.1:${PORT}`);
});