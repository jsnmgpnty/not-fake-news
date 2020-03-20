import express from 'express';
import cors from 'cors';
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

// Cors config
// ===============================
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}

// Server setup
// ===============================
const app = express();
app.use(errorHandler);
app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

NewsApiClient.init(process.env.NEWS_API_URL, 60000, { 'X-Api-Key': process.env.NEWS_API_KEY });

// Routing setup
// ===============================
app.use('/', indexRouter);
app.use('/api/news', usersRouter);
app.get('*', function (req, res) {
  res.status(404).json({
    error: `notFound`,
  });
});

module.exports = app;
