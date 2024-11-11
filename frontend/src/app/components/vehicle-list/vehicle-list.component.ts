import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import {
  Vehicle,
  VehiclePagination,
  VehicleService,
} from '../../services/vehicle.service'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css',
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = []
  isLoading: boolean = true
  errorMessage: string | null = null
  currentPage: number = 1
  totalPages: number = 1
  limit: number = 10
  totalItems: number = 0

  constructor(
    private vehicleService: VehicleService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchVehicles()
  }

  fetchVehicles(page: number = 1) {
    this.isLoading = true
    this.errorMessage = null
    this.vehicleService.getVehicles(page, this.limit).subscribe({
      next: ({ pagination, vehicles }: VehiclePagination) => {
        this.vehicles = vehicles
        this.currentPage = pagination.currentPage
        this.totalPages = pagination.totalPages
        this.totalItems = pagination.totalItems
        this.isLoading = false
        this.cdr.detectChanges()
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar os veículos'
        this.isLoading = false
      },
    })
  }

  navigateToCreate() {
    this.router.navigate(['/vehicles/new'])
  }

  deleteVehicle(id: number) {
    if (confirm('Tem certeza que deseja excluir o veículo?')) {
      this.vehicleService.deleteVehicle(id).subscribe({
        next: () => this.fetchVehicles(this.currentPage),
        error: () => {
          this.errorMessage = 'Não foi possível excluir o veículo'
        },
      })
    }
  }

  editVehicle(id: number) {
    this.router.navigate(['/vehicles/edit', id])
  }

  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page
      this.fetchVehicles(page)
    }
  }
}
