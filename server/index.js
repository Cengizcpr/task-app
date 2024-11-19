import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';
import { log } from 'mercedlogger';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './models/index.js';
const port = process.env.PORT || 5000;
const app = express();

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');

    db.sequelize
      .sync()
      .then(() => {
        console.log('Synced db.');
      })
      .catch((err) => {
        console.log('Failed to sync db: ' + err);
      });
  })
  .catch((err) => {
    console.log('Unable to connect to the database: ' + err);
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

import usersRouter from './router/user.route.js';
import taskRouter from './router/task.route.js';

app.use('/users', usersRouter);
app.use('/tasks', taskRouter);

app.listen(port, () => log.green('Server is running on port', port));

export default app;
