import {
  Motorcycle,
  MotorcycleSchema,
} from '../interfaces/MotorcycleInterface';
import MongoService, { ServiceError } from './MongoService';
import MotorcycleModel from '../models/motorcycle';

type CreateMotorcycle = Motorcycle | ServiceError | null;

class MotorcycleService extends MongoService<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (obj: Motorcycle): Promise<CreateMotorcycle> => {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}

export default MotorcycleService;
