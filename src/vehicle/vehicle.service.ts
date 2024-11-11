import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateVehicleBodySchema } from './dto/create-vehicle.dto'
import { PageQueryParamSchema } from './dto/list-vehicle.dto'
import { UpdateVehicleBodySchema } from './dto/update-vehicle.dto'
import { IVehicleRepository } from './vehicle.repository'

@Injectable()
export class VehicleService {
  constructor(
    @Inject('IVehicleRepository')
    private vehicleRepository: IVehicleRepository,
  ) {}

  async create(createVehicleBodySchema: CreateVehicleBodySchema) {
    return this.vehicleRepository.create(createVehicleBodySchema)
  }

  async findAll(page: PageQueryParamSchema, limit: number = 10) {
    const [vehicles, totalItems] = await this.vehicleRepository.findAll(
      page,
      limit,
    )

    const totalPages = Math.ceil(totalItems / limit)
    return {
      vehicles,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        limit,
      },
    }
  }

  async findOne(id: number) {
    const vehicle = await this.vehicleRepository.findOne(id)

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`)
    }

    return vehicle
  }

  async update(id: number, updateVehicleBodySchema: UpdateVehicleBodySchema) {
    const vehicle = await this.vehicleRepository.findOne(id)

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`)
    }

    return await this.vehicleRepository.update(id, updateVehicleBodySchema)
  }

  async remove(id: number) {
    const vehicle = await this.vehicleRepository.findOne(id)

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`)
    }

    await this.vehicleRepository.remove(id)
  }
}
