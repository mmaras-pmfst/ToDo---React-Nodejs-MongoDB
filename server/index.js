const express = require('express');
const app = express();
const mongoose = require('mongoose');
var session = require('express-session');

//#region //*IMPORT ROUTES
const taskRoute = require('./routes/tasks');
const adminRoute = require('./routes/admin');
const authRoute = require('./routes/auth');
//#endregion

//#region //*MIDDLEWARE
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
  })
);
app.use('/api/user', authRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/admin', adminRoute);
//#endregion

//#region //*DATABASE CONNECTION
const password = process.env.ATLAS_PASS;
const dbname = 'ToDo';
const url = `mongodb+srv://dev_marko:${password}@cluster0-m0eke.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to database!');
  }
);
//#endregion

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
