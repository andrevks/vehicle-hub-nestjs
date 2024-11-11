import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Query,
  HttpCode,
} from '@nestjs/common'
import { VehicleService } from './vehicle.service'
import {
  CreateVehicleBodySchema,
  createVehicleValidationPipe,
} from './dto/create-vehicle.dto'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from './dto/list-vehicle.dto'
import {
  UpdateVehicleBodySchema,
  updateVehicleValidationPipe,
} from './dto/update-vehicle.dto'

@Controller('/vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @UsePipes(createVehicleValidationPipe)
  create(@Body() createVehicleBodySchema: CreateVehicleBodySchema) {
    return this.vehicleService.create(createVehicleBodySchema)
  }

  @Get()
  findAll(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Query('limit', queryValidationPipe) limit?: PageQueryParamSchema,
  ) {
    return this.vehicleService.findAll(page, limit)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(updateVehicleValidationPipe)
    updateVehicleBodySchema: UpdateVehicleBodySchema,
  ) {
    return this.vehicleService.update(+id, updateVehicleBodySchema)
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id)
  }
}
