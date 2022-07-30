import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const MotorcycleSchema = VehicleSchema.extend({
  category: z.union([
    z.literal('Street'),
    z.literal('Custom'),
    z.literal('Trail'),
  ]),
  engineCapacity: z.number().positive().lte(2500),
});

export type Motorcycle = z.infer<typeof MotorcycleSchema>;
