import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import {
  Vehicle,
  VehiclePagination,
  VehicleService,
} from '../../services/vehicle.service'
import { CommonModule } from '@angular/common'

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

  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page
      this.fetchVehicles(page)
    }
  }
}
