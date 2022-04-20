import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  console.log('unused parameter:', next);
  return res.status(err.status).send({ error: err.message });
};

export default errorHandler;
