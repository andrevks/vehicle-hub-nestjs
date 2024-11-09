import { Injectable } from '@nestjs/common'
import { CreateVehicleBodySchema } from './dto/create-vehicle.dto'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { PageQueryParamSchema } from './dto/list-vehicle.dto'
import { UpdateVehicleBodySchema } from './dto/update-vehicle.dto'

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}
  async create(createVehicleBodySchema: CreateVehicleBodySchema) {
    const { placa, chassi, renavam, modelo, marca, ano } =
      createVehicleBodySchema

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

  async findAll(page: PageQueryParamSchema) {
    const perPage = 10
    const vehicles = await this.prisma.vehicle.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      vehicles,
    }
  }

  async findOne(id: number) {
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

  async update(id: number, updateVehicleBodySchema: UpdateVehicleBodySchema) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: { id },
    })

    if (!vehicle) {
      throw new Error('Vehicle not found')
    }

    const { placa, chassi, renavam, modelo, marca, ano } =
      updateVehicleBodySchema
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

  async remove(id: number) {
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
