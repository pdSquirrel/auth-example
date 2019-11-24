import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// db setup
const dbPort = process.env.DB_PORT || 27017;
const dbUrl = process.env.DB_URL || 'localhost';
const dbCollection = process.env.DB_COLLECTION || 'auth-test';

mongoose.set('useCreateIndex', true);
mongoose
  .connect(`mongodb://${dbUrl}/${dbCollection}`, { useNewUrlParser: true })
  .then(_ => console.log('Connected successfully to MongoDB'))
  .catch(err => console.log(err));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(req, res, next) => {
  if(req.body) log.info(req.body);
  if(req.params) log.info(req.params);
  if(req.query) log.info(req.query);
  log.info(`Recieved a ${req.method} request from ${req.ip} for ${req.url}`);
  next();
}

app.use('/users', require('./routes/user'));

app.listen(port, err => {
  if(err) console.log(err);
  console.log(`Listening for Requests on port: ${port}`)
})
