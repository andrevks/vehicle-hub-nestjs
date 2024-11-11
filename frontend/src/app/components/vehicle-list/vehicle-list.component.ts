import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { Vehicle, VehicleService } from '../../services/vehicle.service'
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
  currentPage = 1
  totalPages: number | undefined

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
    this.vehicleService.getVehicles(page).subscribe({
      next: (response) => {
        this.vehicles = response
        console.log('Vehicles loaded:', this.vehicles)
        this.totalPages = response.length
        this.cdr.detectChanges()
        this.isLoading = false
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar os veículos'
        this.isLoading = false
      },
    })
  }

  onPageChange(page: number) {
    this.currentPage = page
    this.fetchVehicles(page)
  }
}
