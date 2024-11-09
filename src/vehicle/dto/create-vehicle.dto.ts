import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'

export const createVehicleBodySchema = z.object({
  placa: z.string(),
  chassi: z.string(),
  renavam: z.string(),
  modelo: z.string(),
  marca: z.string(),
  ano: z.number(),
})

export const createVehicleValidationPipe = new ZodValidationPipe(
  createVehicleBodySchema,
)

export type CreateVehicleBodySchema = z.infer<typeof createVehicleBodySchema>
