// Require the framework and instantiate it
import express from 'express';
const app = express();
require('dotenv').config()
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import noteRouter from './routes/noteRoutes'
import tagRouter from './routes/tagRoutes'

mongoose.connect(process.env.DB_CONN_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`mongodb connect!`)
});

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use('/', noteRouter);
app.use('/', tagRouter);

app.listen(process.env.PORT || 8080, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
