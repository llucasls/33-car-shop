import { ZodError } from 'zod';
// import MongoModel from '../models/MongoModel';
import { Model } from '../interfaces/ModelInterface';

export interface ServiceError {
  error: ZodError;
}

export type Service<T> = T | ServiceError | null;

abstract class MongoService<T> {
  constructor(protected model: Model<T>) { }

  public async create(obj: T): Promise<Service<T>> {
    return this.model.create(obj);
  }

  public async read(): Promise<Service<T[]>> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<Service<T>> {
    return this.model.readOne(id);
  }

  public async update(id: string, obj: T): Promise<Service<T>> {
    return this.model.update(id, obj);
  }

  public async delete(id: string): Promise<Service<T>> {
    return this.model.delete(id);
  }
}

export default MongoService;
