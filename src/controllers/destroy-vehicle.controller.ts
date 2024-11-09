import { Controller, Delete, HttpCode, Param, UsePipes } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'

const idParamSchema = z
  .string()
  .transform((val) => parseInt(val, 10))
  .pipe(z.number().positive())

@Controller('/vehicles')
export class DestroyVehicleController {
  constructor(private prisma: PrismaService) {}
  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(idParamSchema))
  async handle(@Param('id') id: number) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id,
      },
    })

    if (!vehicle) {
      throw new Error('Vehicle not found')
    }

    await this.prisma.vehicle.delete({
      where: {
        id,
      },
    })
  }
}
