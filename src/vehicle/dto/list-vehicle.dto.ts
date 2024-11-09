import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

export const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

export type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
