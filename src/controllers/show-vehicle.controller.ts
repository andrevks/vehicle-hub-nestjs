import { Controller, Get, Param } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'

const idParamSchema = z
  .string()
  .transform((val) => parseInt(val, 10))
  .pipe(z.number().positive())

const paramValidationPipe = new ZodValidationPipe(idParamSchema)

@Controller('/vehicles')
export class ShowVehicleController {
  constructor(private prisma: PrismaService) {}

  @Get(':id')
  async handle(@Param('id', paramValidationPipe) id: number) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id,
      },
    })

    if (!vehicle) {
      throw new Error('Vehicle not found')
    }

    return vehicle
  }
}
