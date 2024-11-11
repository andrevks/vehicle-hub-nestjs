import { Injectable } from '@angular/core'
import { environment } from '../../environments/enviroment'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Vehicle {
  id: number
  placa: string
  chassi: string
  renavam: string
  modelo: string
  marca: string
  ano: number
  createdAt: Date
  updatedAt: Date | null
}

export interface CreateVehicleDTO
  extends Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'> {}

export interface VehiclePagination {
  vehicles: Vehicle[]
  pagination: {
    totalItems: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = `${environment.apiBaseUrl}/vehicles`
  constructor(private http: HttpClient) {}

  getVehicles(
    page: number = 1,
    limit: number = 10,
  ): Observable<VehiclePagination> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
    return this.http.get<VehiclePagination>(this.apiUrl, {
      params,
    })
  }

  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`)
  }

  createVehicle(vehicle: CreateVehicleDTO): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle)
  }

  updateVehicle(
    id: number,
    vehicle: Partial<CreateVehicleDTO>,
  ): Observable<Vehicle> {
    return this.http.patch<Vehicle>(`${this.apiUrl}/${id}`, vehicle)
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
