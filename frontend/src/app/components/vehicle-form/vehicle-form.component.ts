import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Vehicle, VehicleService } from '../../services/vehicle.service'
import { ActivatedRoute, Router } from '@angular/router'
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css',
})
export class VehicleFormComponent implements OnInit {
  isEditMode: boolean = false
  errorMessage: string | null = null
  vehicleForm!: FormGroup
  vehicleDetails: Vehicle | null = null
  vehicleId!: number

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.isEditMode = !!id && !isNaN(Number(id))

    if (this.isEditMode) {
      this.vehicleId = Number(id)
    }

    this.vehicleForm = this.formBuilder.group({
      placa: ['', Validators.required],
      chassi: ['', Validators.required],
      renavam: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: [
        2024,
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
    })

    if (this.isEditMode) {
      this.loadVehicle(Number(id))
    }
  }

  loadVehicle(id: number): void {
    this.vehicleService.getVehicle(id).subscribe({
      next: (vehicle) => {
        this.vehicleDetails = vehicle
        this.vehicleForm.patchValue(vehicle)
      },
      error: () => {
        this.errorMessage = 'Não foi possível buscar informações do veículo'
      },
    })
  }

  saveVehicle() {
    console.log('which mode in save vehicle, is edit mode? ', this.isEditMode)

    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched()
      return
    }

    const save$ = this.isEditMode
      ? this.vehicleService.updateVehicle(
          this.vehicleId,
          this.vehicleForm.value,
        )
      : this.vehicleService.createVehicle(this.vehicleForm.value)

    save$.subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: () => {
        this.errorMessage = 'Não foi possível salvar o veículo '
      },
    })
  }
}
