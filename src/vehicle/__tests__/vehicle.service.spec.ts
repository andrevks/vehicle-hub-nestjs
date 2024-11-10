import { describe, it } from 'mocha'
import sinon from 'sinon'
import { expect } from 'chai'
import { VehicleService } from '../vehicle.service'
import { IVehicleRepository } from '../vehicle.repository'
import { CreateVehicleBodySchema } from '../dto/create-vehicle.dto'
import { NotFoundException } from '@nestjs/common'

describe('VehicleService', () => {
  let vehicleService: VehicleService
  let vehicleRepository: sinon.SinonStubbedInstance<IVehicleRepository>

  beforeEach(() => {
    vehicleRepository = {
      create: sinon.stub(),
      findAll: sinon.stub(),
      findOne: sinon.stub(),
      update: sinon.stub(),
      remove: sinon.stub(),
    }
    vehicleService = new VehicleService(vehicleRepository)
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('create', () => {
    it('should create a new vehicle', async () => {
      const vehicleData: CreateVehicleBodySchema = {
        placa: 'ABC-1234',
        chassi: 'XYZ-4443',
        renavam: '1234567890',
        modelo: 'Corolla',
        marca: 'Toyta',
        ano: 2020,
      }

      const createdVehicle = {
        id: 1,
        ...vehicleData,
        createdAt: new Date(),
        updatedAt: null,
      }
      vehicleRepository.create.resolves(createdVehicle)

      const result = await vehicleService.create(vehicleData)

      expect(
        vehicleRepository.create.calledOnceWithExactly(vehicleData),
      ).to.equal(true)

      expect(result).to.include(vehicleData)
      expect(result).to.have.property('id', createdVehicle.id)
    })
  })

  describe('findAll', () => {
    it('should return a list of vehicles', async () => {
      const vehicles = [
        {
          id: 1,
          placa: 'ABC-1234',
          chassi: 'XYZ-5678',
          renavam: '1234567890',
          modelo: 'Model S',
          marca: 'Tesla',
          ano: 2023,
          createdAt: new Date(),
          updatedAt: null,
        },
        {
          id: 2,
          placa: 'DEF-4323',
          chassi: 'ABC-3221',
          renavam: '0987654321',
          modelo: 'Gol',
          marca: 'Volkswagn',
          ano: 2022,
          createdAt: new Date(),
          updatedAt: null,
        },
      ]
      vehicleRepository.findAll.resolves(vehicles)

      const result = await vehicleService.findAll(1)

      expect(vehicleRepository.findAll.calledOnceWithExactly(1)).to.equal(true)
      expect(result).to.deep.equal(vehicles)
    })
  })

  describe('findOne', () => {
    it('should return a vehicle if it exists', async () => {
      const vehicle = {
        id: 1,
        placa: 'ABC-1234',
        chassi: 'XYZ-5678',
        renavam: '1234567890',
        modelo: 'Model S',
        marca: 'Tesla',
        ano: 2023,
        createdAt: new Date(),
        updatedAt: null,
      }
      vehicleRepository.findOne.resolves(vehicle)

      const result = await vehicleService.findOne(1)

      expect(vehicleRepository.findOne.calledOnceWithExactly(1)).to.equal(true)
      expect(result).to.deep.equal(vehicle)
    })

    it('should throw NotFoundException if vehicle does not exist', async () => {
      vehicleRepository.findOne.resolves(null)

      try {
        await vehicleService.findOne(99999)
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundException)
        if (error instanceof NotFoundException) {
          expect(error.message).to.equal('Vehicle with ID 99999 not found')
        }
      }
    })
  })

  describe('update', () => {
    it('should update and return the updated vehicle', async () => {
      const updatedData = {
        placa: 'XYZ-1234',
        chassi: 'DDD-5678',
        renavam: '9876543210',
        modelo: 'Model X',
        marca: 'Tesla',
        ano: 2024,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const existingVehicle = { id: 1, ...updatedData }
      vehicleRepository.findOne.resolves(existingVehicle)
      vehicleRepository.update.resolves(existingVehicle)

      const result = await vehicleService.update(1, updatedData)

      expect(vehicleRepository.findOne.calledOnceWithExactly(1)).to.equal(true)
      expect(
        vehicleRepository.update.calledOnceWithExactly(1, updatedData),
      ).to.equal(true)
      expect(result).to.deep.equal(existingVehicle)
    })

    it('should throw NotFoundException if vehicle does not exist', async () => {
      vehicleRepository.findOne.resolves(null)

      try {
        await vehicleService.update(99, {
          placa: 'test',
          chassi: 'chassi',
          renavam: 'renavam',
          modelo: 'model',
          marca: 'marca',
          ano: 2020,
        })
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundException)
        if (error instanceof NotFoundException) {
          expect(error.message).to.equal('Vehicle with ID 99 not found')
        }
      }
    })
  })

  describe('remove', () => {
    it('should remove vehicle if it exists', async () => {
      vehicleRepository.findOne.resolves({
        id: 1,
        placa: 'ABC-1234',
        chassi: 'XYZ-5678',
        renavam: '1234567890',
        modelo: 'Model S',
        marca: 'Tesla',
        ano: 2023,
        createdAt: new Date(),
        updatedAt: null,
      })
      vehicleRepository.remove.resolves()

      await vehicleService.remove(1)

      expect(vehicleRepository.findOne.calledOnceWithExactly(1)).to.equal(true)
      expect(vehicleRepository.remove.calledOnceWithExactly(1)).to.equal(true)
    })

    it('should throw NotFoundException if vehicle does not exist', async () => {
      vehicleRepository.findOne.resolves(null)

      try {
        await vehicleService.remove(99)
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundException)
        if (error instanceof NotFoundException) {
          expect(error.message).to.equal('Vehicle with ID 99 not found')
        }
      }
    })
  })
})
