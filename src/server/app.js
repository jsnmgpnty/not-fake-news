import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import errorHandler from './middleware/ErrorHandler';
import 'regenerator-runtime/runtime.js';
dotenv.config();

import indexRouter from './routes/index';
import usersRouter from './routes/news';
import NewsApiClient from './utils/NewsApiClient';

const app = express();
app.use(errorHandler);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

NewsApiClient.init(process.env.NEWS_API_URL, 10000, { 'X-Api-Key': process.env.NEWS_API_KEY });

app.use('/', indexRouter);
app.use('/api/news', usersRouter);
app.get('*', function(req, res){
  res.status(404).json({
    message: 'Route does not exist',
    error: `Request with ${req.url} cannot be handled`,
  });
});

module.exports = app;
