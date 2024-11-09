import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().optional().default(3333),
  DATABASE_URL: z.string(),
})

export type Env = z.infer<typeof envSchema>
