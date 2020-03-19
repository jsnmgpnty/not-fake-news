import { Logger } from '../utils/Logger';

export default function errorHandler(err, req, res, next) {
  const error = err.error || [{ message: err }];
  Logger.error(err);
  res.status(err.status || 500).json(error);
  next();
}
