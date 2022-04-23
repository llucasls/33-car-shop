import { Request, Response, NextFunction } from 'express';
import MongoService, { ServiceError } from '../services/MongoService';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: MongoService<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read() as unknown as T[] | ServiceError;
      return res.json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (req: Request, res: Response, next: NextFunction) =>
    this.service.readOne(req.params.id)
      .then((obj) => res.status(200).json(obj))
      .catch(next);

  update = async (req: RequestWithBody<T>, res: Response, next: NextFunction) =>
    this.service.update(req.params.id, req.body)
      .then((obj) => res.status(200).json(obj))
      .catch(next);

  delete = async (req: Request, res: Response, next: NextFunction) =>
    this.service.delete(req.params.id)
      .then((obj) => res.status(204).json(obj))
      .catch(next);
}

export default Controller;
