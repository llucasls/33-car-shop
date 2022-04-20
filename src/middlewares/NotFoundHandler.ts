import { RequestHandler } from 'express';

const notFoundHandler: RequestHandler = (req, res) => res
  .status(404).send({ message: 'Object not found' });

export default notFoundHandler;
