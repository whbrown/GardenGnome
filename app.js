require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
// const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const flash = require('connect-flash');

const session = require('express-session');
const passport = require('passport');
require('./configs/passport');

const cors = require('cors');
// Enable authentication using session + passport
const MongoStore = require('connect-mongo')(session);
const appName = require('./package.json').name;

mongoose
  .connect('mongodb://localhost/gardengnome', { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const debug = require('debug')(
  `${appName}:${path.basename(__filename).split('.')[0]}`
);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// default value for title local
app.locals.title = 'Garden Gnome server';
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(flash());

// USE passport.initialize() and passport.session() HERE:

app.use(passport.initialize());
app.use(passport.session());

// USE CORS to allow React to run through different PORT in conjunction

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'], // <== this will be the URL of our React app (it will be running on port 3000)
  })
);

// ROUTES MIDDLEWARE STARTS HERE:

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const plantRoutes = require('./routes/plants');
app.use('/api/plants', plantRoutes);

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

app.use('/api', require('./routes/file-upload-routes'));

module.exports = app;
