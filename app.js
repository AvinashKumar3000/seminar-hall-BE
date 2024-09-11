const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

// Import route files
const authRoutes = require('./routes/auth');
const collegeRoutes = require('./routes/colleges');
const seminarHallRoutes = require('./routes/seminarHalls');
const bookingRoutes = require('./routes/bookings');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

dotenv.config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/auth', authRoutes);                   // Authentication routes (login, signup)
app.use('/api/colleges', collegeRoutes);            // College management routes (admin only)
app.use('/api/seminar-halls', seminarHallRoutes);   // Seminar halls routes
app.use('/api/bookings', bookingRoutes);            // Booking routes (students)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});