import { Body, Controller, Param, Put } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'

const paramIdSchema = z
  .string()
  .transform((val) => parseInt(val, 10))
  .pipe(z.number().positive())

const paramValidationPipe = new ZodValidationPipe(paramIdSchema)

const changeVehicleBodySchema = z.object({
  placa: z.string(),
  chassi: z.string(),
  renavam: z.string(),
  modelo: z.string(),
  marca: z.string(),
  ano: z.number(),
})

type ChangeVehicleBodySchema = z.infer<typeof changeVehicleBodySchema>

@Controller('/vehicles')
export class ChangeVehicleController {
  constructor(private prisma: PrismaService) {}

  @Put(':id')
  async handle(
    @Param('id', paramValidationPipe) id: number,
    @Body(new ZodValidationPipe(changeVehicleBodySchema))
    body: ChangeVehicleBodySchema,
  ) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: { id },
    })

    if (!vehicle) {
      throw new Error('Vehicle not found')
    }

    const { placa, chassi, renavam, modelo, marca, ano } = body
    await this.prisma.vehicle.update({
      where: {
        id,
      },
      data: {
        placa,
        chassi,
        renavam,
        modelo,
        marca,
        ano,
      },
    })
  }
}
