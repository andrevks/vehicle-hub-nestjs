import { Module } from '@nestjs/common'
import { VehicleService } from './vehicle.service'
import { VehicleController } from './vehicle.controller'
import { DatabaseModule } from 'src/database/database.module'
import { PrismaVehicleRepository } from './vehicle.repository'

@Module({
  imports: [DatabaseModule],
  controllers: [VehicleController],
  providers: [
    VehicleService,
    {
      provide: 'IVehicleRepository',
      useClass: PrismaVehicleRepository,
    },
  ],
})
export class VehicleModule {}
