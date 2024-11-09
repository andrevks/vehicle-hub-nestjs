import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CreateVehicleController } from './controllers/create-vehicle.controller'
import { envSchema } from './env'
import { PrismaService } from 'prisma/prisma.service'
import { FetchVehicleController } from './controllers/fetch-vehicle.controller'
import { DestroyVehicleController } from './controllers/destroy-vehicle.controller'
import { ChangeVehicleController } from './controllers/change-vehicle.controller'
import { ShowVehicleController } from './controllers/show-vehicle.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [
    CreateVehicleController,
    FetchVehicleController,
    DestroyVehicleController,
    ChangeVehicleController,
    ShowVehicleController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
