import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'

const paramIdSchema = z
  .string()
  .transform((val) => parseInt(val, 10))
  .pipe(z.number().positive())

export const paramValidationPipe = new ZodValidationPipe(paramIdSchema)

const UpdateVehicleBodySchema = z.object({
  placa: z.string(),
  chassi: z.string(),
  renavam: z.string(),
  modelo: z.string(),
  marca: z.string(),
  ano: z.number(),
})

export const updateVehicleValidationPipe = new ZodValidationPipe(
  UpdateVehicleBodySchema,
)
export type UpdateVehicleBodySchema = z.infer<typeof UpdateVehicleBodySchema>
