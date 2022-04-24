import { ZodError } from 'zod';
import HttpError from '../utils/HttpError';
// import MongoModel from '../models/MongoModel';
import { Model } from '../interfaces/ModelInterface';

export interface ServiceError {
  error: ZodError;
}

export type Service<T> = T | ServiceError | null;

enum ServiceErrors {
  invalidIdFormat = 'Id must have 24 hexadecimal characters',
  notFound = 'Object not found',
  internal = 'Internal Server Error',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

abstract class MongoService<T> {
  protected errors = ServiceErrors;

  protected idFormat = /^[0-9a-f]{24}$/;

  constructor(protected model: Model<T>) { }

  public async create(obj: T): Promise<Service<T>> {
    return this.model.create(obj);
  }

  public async read(): Promise<Service<T[]>> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<Service<T>> {
    if (!this.idFormat.test(id)) {
      throw new HttpError(400, this.errors.invalidIdFormat);
    }
    const result = await this.model.readOne(id);
    if (!result) {
      throw new HttpError(404, this.errors.notFound);
    }
    return result;
  }

  public async update(id: string, obj: T): Promise<Service<T>> {
    if (!this.idFormat.test(id)) {
      throw new HttpError(400, this.errors.invalidIdFormat);
    }
    const result = await this.model.update(id, obj);
    if (!result) throw new HttpError(404, this.errors.notFound);
    return result;
  }

  public async delete(id: string): Promise<void> {
    if (!this.idFormat.test(id)) {
      throw new HttpError(400, this.errors.invalidIdFormat);
    }
    const result = await this.model.delete(id);
    if (!result) throw new HttpError(404, this.errors.notFound);
  }
}

export default MongoService;
