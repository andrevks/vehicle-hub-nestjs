import { Routes } from '@angular/router'
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component'
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component'

export const routes: Routes = [
  { path: '', component: VehicleListComponent },
  {
    path: 'vehicles/new',
    component: VehicleFormComponent,
  },
  {
    path: 'vehicles/edit/:id',
    component: VehicleFormComponent,
  },
]
