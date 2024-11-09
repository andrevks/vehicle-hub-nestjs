import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'prisma/prisma.service'
import { z } from 'zod'

const createVehicleBodySchema = z.object({
  placa: z.string(),
  chassi: z.string(),
  renavam: z.string(),
  modelo: z.string(),
  marca: z.string(),
  ano: z.number(),
})

type CreateVehicleBodySchema = z.infer<typeof createVehicleBodySchema>

@Controller('/vehicles')
export class CreateVehicleController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createVehicleBodySchema))
  async handle(@Body() body: CreateVehicleBodySchema) {
    const { placa, chassi, renavam, modelo, marca, ano } = body

    await this.prisma.vehicle.create({
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
