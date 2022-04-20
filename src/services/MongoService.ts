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
}

abstract class MongoService<T> {
  protected errors = ServiceErrors;

  constructor(protected model: Model<T>) { }

  public async create(obj: T): Promise<Service<T>> {
    return this.model.create(obj);
  }

  public async read(): Promise<Service<T[]>> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<Service<T>> {
    const idFormat = /^[0-9a-f]{24}$/;
    if (!idFormat.test(id)) {
      throw new HttpError(400, this.errors.invalidIdFormat);
    }
    const obj = await this.model.readOne(id);
    if (!obj) {
      throw new HttpError(404, this.errors.notFound);
    }
    return obj;
  }

  public async update(id: string, obj: T): Promise<Service<T>> {
    return this.model.update(id, obj);
  }

  public async delete(id: string): Promise<Service<T>> {
    return this.model.delete(id);
  }
}

export default MongoService;
