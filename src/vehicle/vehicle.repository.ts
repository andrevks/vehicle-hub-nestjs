import { PrismaService } from 'src/database/prisma/prisma.service'
import { CreateVehicleBodySchema } from './dto/create-vehicle.dto'
import { PageQueryParamSchema } from './dto/list-vehicle.dto'
import { UpdateVehicleBodySchema } from './dto/update-vehicle.dto'
import { Injectable } from '@nestjs/common'
import { Vehicle } from './entities/vehicle.entity'

export interface IVehicleRepository {
  create(data: CreateVehicleBodySchema): Promise<Vehicle>
  findAll(page: number, perPage?: number): Promise<Vehicle[]>
  findOne(id: number): Promise<Vehicle | null>
  update(id: number, data: UpdateVehicleBodySchema): Promise<Vehicle>
  remove(id: number): Promise<void>
}

@Injectable()
export class PrismaVehicleRepository implements IVehicleRepository {
  constructor(private prisma: PrismaService) {}
  async create(
    createVehicleBodySchema: CreateVehicleBodySchema,
  ): Promise<Vehicle> {
    const { placa, chassi, renavam, modelo, marca, ano } =
      createVehicleBodySchema

    return this.prisma.vehicle.create({
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

  async findAll(page: PageQueryParamSchema): Promise<Vehicle[]> {
    const perPage = 10
    return this.prisma.vehicle.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async findOne(id: number): Promise<Vehicle | null> {
    return this.prisma.vehicle.findFirst({
      where: {
        id,
      },
    })
  }

  async update(
    id: number,
    updateBodySchema: UpdateVehicleBodySchema,
  ): Promise<Vehicle> {
    const { placa, chassi, renavam, modelo, marca, ano } = updateBodySchema
    return this.prisma.vehicle.update({
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

  async remove(id: number): Promise<void> {
    await this.prisma.vehicle.delete({
      where: {
        id,
      },
    })
  }
}
