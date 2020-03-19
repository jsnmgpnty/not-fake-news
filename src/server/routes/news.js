import express from 'express';
import NewsService from '../services/NewsService';
import Logger from '../utils/Logger';

const router = express.Router();

// Get all news listing
router.get('/', async function(req, res, next) {
  const query = req.query.query;
  const language = req.query.language;
  const sources = req.query.sources;
  const pageSize = req.query.pageSize;
  const page = req.query.page;

  try {
    const result = await NewsService.getEverything(query, language, sources, pageSize, page);
    res.json(result);
  } catch (error) {
    Logger.error(error);
    next();
  }
});

// Get top news headlines
router.get('/top', async function(req, res, next) {
  const query = req.query.query;
  const country = req.query.country;
  const category = req.query.category;
  const sources = req.query.sources;
  const pageSize = req.query.pageSize;
  const page = req.query.page;

  try {
    const result = await NewsService.getTopHeadlines(query, country, category, sources, pageSize, page);
    res.json(result);
  } catch (error) {
    Logger.error(error);
    next();
  }
});

// Get news sources
router.get('/sources', async function(req, res, next) {
  const country = req.query.country;
  const category = req.query.category;
  const language = req.query.language;

  try {
    const result = await NewsService.getSources(category, country, language);
    res.json(result);
  } catch (error) {
    Logger.error(error);
    next();
  }
});

export default router;
